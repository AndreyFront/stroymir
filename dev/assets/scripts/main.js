function smoothView(btn, el, startHeight = 0) {

    if (!btn && !el) return

    const add = () => {
        btn.classList.add('not-active')
        el.classList.add('not-active')
    }

    const remove = () => {
        btn.classList.remove('not-active')
        el.classList.remove('not-active')
    }

    let heightEl = el.offsetHeight
    add()
    el.style.height = `${startHeight}px`

    if (startHeight > 0) {
        if (heightEl < startHeight) {
            remove()
            el.style.height = `${heightEl}px`
        }
    }

    const update = () => {
        el.style.height = 'auto'
        setTimeout(() => {
            heightEl = el.offsetHeight
            el.style.height = `${heightEl}px`
        }, 100)
    }

    btn.addEventListener('click', () => {
        if (el.classList.contains('not-active')) {
            remove()
            el.style.height = `${heightEl}px`
        } else {
            add()
            el.style.height = `${startHeight}px`
        }
    })

    let observer = new MutationObserver(mutationRecords => {
        update()
    })
        
    observer.observe(el, {
        childList: true, 
        subtree: true,
        characterDataOldValue: true
    })
}

function footer() {
    const main = document.querySelector('[data-footer="main"]')

    if (!main) return

    if (window.matchMedia("(max-width: 767px)").matches) {
        const blockContacts = main.querySelector('[data-footer="block-contacts"]')

        const blocksNav = main.querySelectorAll('[data-footer="block-nav"]')

        const wrapNav = main.querySelector('[data-footer="wrap-nav"]')

        const blockSocialNetwork = main.querySelector('[data-footer="block-social-network"]')
        const logo = main.querySelector('[data-footer="logo"]')

        if (blockSocialNetwork && logo) {
            const cloned = blockSocialNetwork.cloneNode(true)
            logo.after(cloned)
            blockSocialNetwork.remove()
        }

        if (blockContacts && wrapNav) {
            const cloned = blockContacts.cloneNode(true)
            wrapNav.after(cloned)
            blockContacts.remove()
        }

        blocksNav.forEach(blockNav => {
            const blockHead = blockNav.querySelector('[data-footer="block-head"]')
            const blockBody = blockNav.querySelector('[data-footer="block-body"]')

            smoothView(blockHead, blockBody)
        })

        setTimeout(() => {
            const blockContacts = main.querySelector('[data-footer="block-contacts"]')
            if (blockContacts) {
                const blockHead = blockContacts.querySelector('[data-footer="block-head"]')
                const blockBody = blockContacts.querySelector('[data-footer="block-body"]')
    
                smoothView(blockHead, blockBody)
            }
        })
    }
}

function banner() {
    const mains = document.querySelectorAll('[data-banner="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const slider = main.querySelector('[data-banner="slider"]')
        const pagination = main.querySelector('[data-banner="pagination"]')

        const swiper = new Swiper(slider, {
            pagination: {
              el: pagination,
              clickable: true
            },
        })
    })
}

function cardSlider() {
    const mains = document.querySelectorAll('[data-cards-slider="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const slider = main.querySelector('[data-cards-slider="slider"]')
        const slides = slider.querySelectorAll('.swiper-slide')
        const btnPrev = main.querySelector('[data-cards-slider="btn-prev"]')
        const btnNext = main.querySelector('[data-cards-slider="btn-next"]')

        const swiper = new Swiper(slider, {
            slidesPerView: 2.15,
            spaceBetween: 8,
            navigation: {
                nextEl: btnNext,
                prevEl: btnPrev,
            },
            breakpoints: {
                1440: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
                576: {
                    slidesPerView: 2.2,
                    spaceBetween: 20,
                },
            }
        })

        const heightSlider = slider.offsetHeight

        slides.forEach(slide => slide.style.height = `${heightSlider}px`)
    })
}

function counter() {
    const parentBlocks = document.querySelectorAll(`[data-counter="counter"]`)
    if (!parentBlocks.length) return
    parentBlocks.forEach(elem => {
        const remove = elem.querySelector('[data-counter="remove"]')
        const add = elem.querySelector('[data-counter="add"]')
        const input = elem.querySelector('[data-counter="input"]')
    
        const max = +input.getAttribute('max')
        const min = +input.getAttribute('min')
    
        const validInput = (value) => {
            const inputValue = +value
            switch (true) {
                case inputValue <= min:
                    input.value = min
                    remove.setAttribute('disabled', '')
                break
                case inputValue >= max:
                    input.value = max
                    add.setAttribute('disabled', '')
                break
                default:
                    remove.removeAttribute('disabled')
                    add.removeAttribute('disabled')
            }
        }
    
        validInput(input.value)
    
        input.addEventListener('change', () => {
            console.log(input.value)
            validInput(input.value)
        })
    
        add.addEventListener('click', () => {
            input.value++
            validInput(input.value)
        })
    
        remove.addEventListener('click', () => {
            input.value--
            validInput(input.value)
        })
    })
}

function sCards() {
    if (window.matchMedia("(max-width: 992px)").matches) {
        const mains = document.querySelectorAll('[data-s-cards="main"]')

        if (!mains.length) return
    
        mains.forEach(main => {
            const slider = main.querySelector('[data-s-cards="slider"]')
    
            const swiper = new Swiper(slider, {
                slidesPerView: 2.15,
                spaceBetween: 8,
                breakpoints: {
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    576: {
                        slidesPerView: 2.2,
                        spaceBetween: 20,
                    },
                }
            })
        })
    }
}

function search() {
    const main = document.querySelector('[data-search="main"]')

    if (!main) return

    document.addEventListener('click', (event) => {
        const el = event.target
        if (el.closest('[data-search="main"]')) {
            if (el.closest('[data-search="input"]')) {
                main.classList.toggle('active')
            }
        } else {
            main.classList.remove('active')
        }
    })
}

footer()
banner()
cardSlider()
counter()
sCards()
search()