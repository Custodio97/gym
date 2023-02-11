// function for menu mobile
function outClick(element, events, callback) {
    const html = document.documentElement
    const outside = "data-outside"
    
    if (!element.hasAttribute(outside)) {
        events.forEach(userEvent => {
            setTimeout(()=> html.addEventListener(userEvent,handleOutsideClick))
        })
        element.setAttribute(outside,'')
    }

    function handleOutsideClick(event) {
        if (!element.contains(event.target)) {
            element.removeAttribute(outside)
            events.forEach(userEvent => {
                html.removeEventListener(userEvent, handleOutsideClick)
            })
            callback()
        }
    }
}
function initMenuMobile() {
    const $toggle = document.querySelector('[data-toggle-navbar]')
    const $nav = document.querySelector('[data-navbar]')
    const events = ['touchstart', 'click']
    
    if ($toggle) {
        function openMenu() {
            $nav.classList.add('active')
            $toggle.classList.add('active')
            outClick($nav, events, () => {
                $nav.classList.remove('active')
                $toggle.classList.remove('active')
            })
        }
        events.forEach(event => $toggle.addEventListener(event, openMenu) )
    }
}
initMenuMobile()

// function

function initScrollAnimetion() {
   
    const $elementScroll = document.querySelectorAll('[data-scroll-anime]')
    if ($elementScroll.length) {
        const windowHeight = window.innerHeight * 0.6
        const animetionScroll = () => {
            $elementScroll.forEach((element) => {
                const clientHeight = element.getBoundingClientRect().top
                const elementAnimetion = (clientHeight - windowHeight) < 0
                
                if (elementAnimetion) {
                    element.classList.add('active')
                } else if (element.classList.contains('active')) {
                    element.classList.remove('active')
                }
            })
        }
        animetionScroll()

        window.addEventListener('scroll', animetionScroll)
    }
} 

initScrollAnimetion()

function initAnimeNumber() {
    function animeNumber() {
        const numbers = document.querySelectorAll('[data-counter]')

        numbers.forEach((number) => {
            
            const total = +number.innerText
            const incremento = Math.floor(total / 100)
            let start = 0
            const timer = setInterval(() => {
                start = start + incremento
                number.innerText = start
                if (start > total) {
                    number.innerText = total
                    clearInterval(timer)
                }
            }, 30 * Math.random())
        })
    }
    function handleMutation(mutation) {
        if (mutation[0].target.classList.contains('active')) {
            observer.disconnect()
            animeNumber()
        }
    }

    const observerTarget = document.querySelector('.numeros')
    const observer = new MutationObserver(handleMutation)
    
    observer.observe(observerTarget,{attributes:true})
}

initAnimeNumber()