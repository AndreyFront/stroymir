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

function validateForm() {
    const forms = document.querySelectorAll('[data-validate-form]')

    if (!forms.length) return

    let needValidate = false

    document.addEventListener('click', (event) => {
        const el = event.target

        if (el.closest('[data-validate-form]')) {
            const form = el.closest('[data-validate-form]')
            const inputs = form.querySelectorAll('.input')
            const regExpName = /^[A-ZА-ЯЁ]+$/i

            const validate = () => {
                if (inputs.length) {
                    inputs.forEach(elInput => {
                        const input = elInput

                        if (input.hasAttribute('required')) {
                            const type = input.getAttribute('data-input-type')

                            if (input.value) {
                                const value = input.value

                                if (type === 'tel') {
                                    if (value.length < 16) {
                                        input.classList.add('input--error')
                                    } else {
                                        input.classList.remove('input--error')
                                    }
                                }

                                if (type === 'name') {
                                    const minlength = +input.getAttribute('minlength')

                                    if (!value.match(regExpName)) {
                                        input.classList.add('input--error')
                                    } else {
                                        input.classList.remove('input--error')
                                    }
                                }

                                if (type === 'surname') {
                                    const minlength = +input.getAttribute('minlength')

                                    if (!value.match(regExpName)) {
                                        input.classList.add('input--error')
                                    } else {
                                        input.classList.remove('input--error')
                                    }
                                }

                                if (type === 'patronymic') {
                                    const minlength = +input.getAttribute('minlength')

                                    if (!value.match(regExpName)) {
                                        input.classList.add('input--error')
                                    } else {
                                        input.classList.remove('input--error')
                                    }
                                }

                                if (type === 'address') {
                                    const minlength = +input.getAttribute('minlength')

                                    if (!value.match(regExpName)) {
                                        input.classList.add('input--error')
                                    } else {
                                        input.classList.remove('input--error')
                                    }
                                }

                                if (type === 'email') {
                                    if (!validator.isEmail(value)) {
                                        input.classList.add('input--error')
                                    } else {
                                        input.classList.remove('input--error')
                                    }
                                }

                            } else {
                                input.classList.add('input--error')
                            }
                        }
                    })
                }
            }

            if (needValidate) validate()

            if (el.closest('button[type="submit"]')) {
                event.preventDefault()

                needValidate = true

                let numberСorrectАields = 0

                if (inputs.length) {
                    validate()

                    inputs.forEach(elInput => {
                        if (!elInput.classList.contains('input--error')) {
                            numberСorrectАields++
                        } else {
                            elInput.classList.add('input--error')
                        }
                    })

                    if (numberСorrectАields === inputs.length) {
                        console.log('Send data')

                        if (form.hasAttribute('action')) {
                            form.submit()
                        }
                    }
                }
            }
        }
    })
}

function phoneMask() {
    const phoneMasks = document.querySelectorAll('[data-phone-mask]')

    if (!phoneMasks.length) return

    phoneMasks.forEach(phoneMask => {
        IMask(phoneMask, {
                mask: '+{7}(000)000-00-00'
            }
        )
    })
}

function page() {
    const main = document.querySelector('[data-page="main"]')
    const header = document.querySelector('[data-header="main"]')

    if (!main) return
    if (!header) return
    
    const wrapperContent = main.querySelector('[data-page="wrapper-content"]')

    if (wrapperContent) {
        wrapperContent.style.paddingTop = `${header.offsetHeight}px`
    } else {
        main.style.paddingTop = `${header.offsetHeight}px`
    }
}

function fixedHeader() {
    const header = document.querySelector('[data-header="main"]')

    if (!header) return

    const logic = (scrolled) => {
        if (scrolled >= 50) {
            header.classList.add('header--fixed')
        } else {
            header.classList.remove('header--fixed')
        }
    }

    logic(window.pageYOffset)

    window.addEventListener('scroll', (event) => {
        const scrolled = window.pageYOffset ? window.pageYOffset : document.body.scrollTop;
        
        logic(scrolled)
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

function customScrollbar() {
    const elements = document.querySelectorAll('[data-scrollbar]')

    if (!elements.length) return

    elements.forEach(elem => {
        new SimpleBar((elem), {
            autoHide: false
        })
    })
}

function menu() {
    const main = document.querySelector('[data-manu="main"]')

    if (!main) return

    if (window.matchMedia("(max-width: 992px)").matches) {
        const cloned = main.cloneNode(true)
        main.remove()
        document.body.append(cloned)
    }
}

function map() {
    const main = document.querySelector('[data-map="main"]')

    if (!main) return

    ymaps.ready(init())

    function init() {
        const map = main.querySelector('#map')

        if (!map) return

        const htmlMapContent = (name, place, image, url) => {
            return `
                <div class="map-content">
                    <div class="map-content__block-info">
                        <span class="map-content__name">${name}</span>
                        <span class="map-content__place">${place}</span>
                    </div>
                    <div class="map-content__block-image">
                        <img src="${image}" class="map-content__image"/>
                    </div>
                    <div class="map-content__block-link">
                        <a href="${url}" class="map-content__link">Смотреть проект</a>
                    </div>
                </div>
            `
        }

        const myMap = new ymaps.Map(map, {
            center: [55.77101400, 37.63209300],
            zoom: 13,
            controls: ["zoomControl"]
        });

        myMap.controls.add('fullscreenControl', { float: 'left' })

        let pm = new ymaps.Placemark([55.77101400, 37.63209300], {
            balloonContent: htmlMapContent('Гостевой дома “Регата”', 'г. Ростов-на-Дону', './assets/images/image-8.jpg', '#'),
            preset: 'islands#blackStretchyIcon',
            draggable: true,
        }, {
            iconLayout: 'default#image',
            iconImageHref: './assets/images/point.svg',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
            hideIconOnBalloonOpen: false,
        })

        myMap.geoObjects.add(pm)

        pm.events.add('click', (event) => {
            myMap.setCenter(event.get('target').geometry.getCoordinates())
        })
    } 
}

validateForm()
phoneMask()
page()
fixedHeader()
footer()
banner()
cardSlider()
counter()
sCards()
search()
menu()
map()


customScrollbar()