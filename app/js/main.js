window.addEventListener('DOMContentLoaded', () => {
	//Smooth Scroll
	function scrollTo() {
		const links = document.querySelectorAll('.navbar-links__link')
		links.forEach((each) => (each.onclick = scrollAnchors))
	}

	function scrollAnchors(e, respond = null) {
		const distanceToTop = (el) => Math.floor(el.getBoundingClientRect().top)
		e.preventDefault()
		var targetID = respond ? respond.getAttribute('href') : this.getAttribute('href')
		const targetAnchor = document.querySelector(targetID)
		if (!targetAnchor) return
		const originalTop = distanceToTop(targetAnchor)
		window.scrollBy({ top: originalTop - 30, left: 0, behavior: 'smooth' })
		const checkIfDone = setInterval(function () {
			const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2
			if (distanceToTop(targetAnchor) === 0 || atBottom) {
				targetAnchor.tabIndex = '-1'
				targetAnchor.focus()
				window.history.pushState('', '', targetID)
				clearInterval(checkIfDone)
			}
		}, 100)
	}
	scrollTo()

	// Кнопка menu
	let btn = document.querySelector('.burger')
	let menu = document.querySelector('.navbar-links')
	let menuItem = document.querySelectorAll('.navbar-links__link')

	btn.addEventListener('click', () => {
		menu.classList.toggle('active')
		btn.classList.toggle('active')

		menuItem.forEach((item) => {
			item.addEventListener('click', () => {
				btn.classList.remove('active')
				menu.classList.remove('active')
			})
		})
	})

	// Фиксированное меню после прокрутки
	function topMenuFixed() {
		let header = document.querySelector('.navbar')
		let fixedSpot = document.querySelector('.about').offsetTop

		window.addEventListener('scroll', function () {
			let scrollPos = window.pageYOffset
			if (scrollPos > fixedSpot) {
				header.classList.add('navbar--fixed')
			} else {
				header.classList.remove('navbar--fixed')
			}
		})
	}
	topMenuFixed()
})
