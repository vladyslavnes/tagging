var tagTexts = ['JSIsUnbelievable','addYourOwnImage','thisIsNotJSEmblem']

function tagTemplate(content) {
	return `<p class="tag" 
		onmousedown="moveTagStart(this, event, 'mouse')"
		onmousemove="moveTag(this, event, 'mouse')"
		onmouseup="moveTagEnd(this, event, 'mouse')"
		ontap="tapTag(this,event);"
		ontouchstart="touchTagStart(this, event)"
		ontouchmove="moveTag(this, event, 'touch')"
		<span class="text">${content}</span>
		<span class="rm" onclick="this.parentNode.remove()" ontouch="this.parentNode.remove()">X</span>
	</p>`
}

function setTagPosition(tag) {
	setup()
	var tw = tag.clientWidth,
		th = tag.clientHeight,
		tx = parseInt(tag.style.left),
		ty = parseInt(tag.style.top),
		iw = img.naturalWidth,
		ih = img.naturalHeight,
		ix = (parseInt(window.innerWidth)/2) - (iw/2) | 0,
		iy = img.offsetTop;
	
	if (tx+tw >= ix+iw) {
		tag.style.left = ((ix + iw - tw) | 0) + 'px'

		tag.style.flexDirection = 'row-reverse'
	} else {
		tag.style.flexDirection = 'row'
	}

	if (ty+th >= iy+ih) {
		tag.style.top = (iy + ih - th + 4.5) + 'px'
	}
	if (tx <= ix) {
		tag.style.left = ix + 'px'
	}
	if (ty <= iy) {
		tag.style.top = iy + 'px'
	}
}

function tapTag(tag, e) {
	e.preventDefault()
	tags().forEach(tag => tag.className = 'tag')
	tag.className = 'tag active'
}

function tags() {
	return Array.from(document.querySelectorAll('.tag'))
}

function touchTagStart(tag, e) {
	e.preventDefault()
	tapTag(tag, e)
}

function moveTagStart(tag, e, mode) {
	e.preventDefault()
	tapTag(tag, e)

	window.draggingTag = tag
}

function moveTagEnd(tag, e, mode) {
	e.preventDefault()

	window.draggingTag = undefined
}

function clickTag(tag, e) {
	tapTag()
}

function moveTag(tag, e, mode) {
	if (mode === 'touch') {
		tag.style.left = (e.touches[0].pageX - tag.clientWidth/2) + 'px'
		tag.style.top = (e.touches[0].pageY - tag.clientHeight/2) + 'px'
	} else if (mode === 'mouse') {
		if (window.draggingTag) {
			tag.style.left = (e.clientX - tag.clientWidth/2) + 'px'
			tag.style.top = (e.clientY - tag.clientHeight/2) + 'px'
		}
	}
	setTagPosition(tag)
}

function setup() {
	window.img = document.querySelector('img')
	window.tagsContainer = document.getElementById('tags-container')

	window.tagsContainer.width = img.width
	window.tagsContainer.height = img.height
}

function addTag(content = tagTexts[Math.random() * tagTexts.length | 0],xCoord,yCoord) {	
	
	tagsContainer.innerHTML += tagTemplate(content)	
	var tag = document.querySelector('.tag:last-child')


	if (!(xCoord && yCoord)) {
		xCoord = (Math.random() * window.innerWidth - tag.clientWidth) | 0
		yCoord = (Math.random() * window.innerHeight - tag.clientHeight) | 0
	}
	

	

	tag.style.left = xCoord + 'px'
	tag.style.top = yCoord + 'px'

	setTagPosition(tag)
}


function allowDrop(e) {
	e.preventDefault()
}

function drop(e) {
	e.preventDefault()
	var data = e.dataTransfer.getData('text/plain')
	var imageURIRegExp = /(jpg|gif|png)$/
	if (imageURIRegExp.test(data)) {
		// image
		e.target.setAttribute('src',data)
	} else {
		// text
		addTag(data,e.clientX,e.clientY)
	}
	setup()
}

setup()
addTag(undefined,420,500)
addTag(undefined,500,100)
addTag(undefined,200,300)