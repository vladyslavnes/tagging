var tagTexts = ['JSIsUnbelievable','addYourOwnImage','thisIsNotJSEmblem']

function tagTemplate(content) {
	return `<p class="tag" 
		onclick="tapTag(this,event)"
		ontap="tapTag(this,event);tapTag(this,event)"
		ontouchstart="touchTagStart(this,event)"
		ontouch="touchTag(this,event)"
		ondblclick="this.remove();">
		<span class="text">${content}</span>
		<span style="display: none;" class="rm" onclick="this.parentNode.remove()" ontouch="this.parentNode.remove()">X</span>
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
		ix = (window.innerWidth/2) - (iw/2) | 0,
		iy = 29;
	
	if (tx+tw >= ix+iw) {
		tag.style.left = ((ix + iw - tw) | 0) + 'px'

		// make 'X' button appear on the left
		tag.children[1].style.paddingRight = '5px'
		
		tag.children[1].style.float = 'left'
		tag.children[1].style.borderLeft = 'none'
		tag.children[1].style.borderRight = '1px solid #000'
	} else {
		tag.children[1].style.paddingLeft = '5px'
		tag.children[1].style.float = 'right'
		tag.children[1].style.borderLeft = '1px solid #000'
		tag.children[1].style.borderRight = 'none'
	}

	if (ty+th >= iy+ih) {
		tag.style.top = (iy + ih - th + 10) + 'px'
	}

	
	if (tx <= ix) {
		tag.style.left = (ix) + 'px'
	}

	if (ty <= iy) {
		tag.style.top = (iy + 10) + 'px'
	}
}

function tapTag(tag,e) {
	e.preventDefault()

	tag.querySelector('.rm').style.display = tag.querySelector('.rm').style.display === 'none' ? 'inline' : 'none'

	window.isDraggingTag = !window.isDraggingTag


		if (e.touches[0]) {
			window.ontouchmove = window.isDraggingTag ? e => {
				tag.style.left = e.touches[0].clientX-10+'px'
				tag.style.top = e.touches[0].clientY-5 + 'px'
				setTagPosition(tag)
			} : undefined
		} else {
			window.onmousemove = window.isDraggingTag ? e => {
				tag.style.left = e.clientX-10+'px'
				tag.style.top = e.clientY-5 + 'px'
				setTagPosition(tag)
			} : undefined
		}
}

function touchTagStart(tag,e) {
	e.preventDefault()
	setTagPosition(tag)
}

function touchTag(tag,e) {
	e.preventDefault()
	tag.style.left = e.touches[0].clientX+'px'
	tag.style.top = e.touches[0].clientY+'px'
}

function clickTag(tag,e) {
	e.preventDefault()
	tag.style.left = e.clientX+'px'
	tag.style.top = e.clientY+'px'
}

function dropTag(tag,e) {
	e.preventDefault()

	window.isDraggingTag = false

	tag.style.left = e.touches[0].clientX+'px'
	tag.style.top = e.touches[0].clientY + 'px'
	setTagPosition(tag)
}

function setup() {
	window.img = document.querySelector('img')
	window.tags = Array.from(document.getElementsByClassName('.tag'))
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
addTag(undefined,window.innerWidth/2,300)