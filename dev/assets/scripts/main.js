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

footer()