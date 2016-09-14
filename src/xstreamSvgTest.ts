import xs from 'xstream'
import fromEvent from 'xstream/extra/fromEvent'

const mkCircle = ([cx,cy]) => {
  console.log([cx,cy])
  const circ = document.createElementNS("http://www.w3.org/2000/svg", 'circle')
  circ.setAttribute('cx', cx)
  circ.setAttribute('cy', cy)
  circ.setAttribute('r', '50')
  circ.style.stroke = 'red'
  circ.style.fill = 'red'
  return circ
}

// Wrap an SVG element elem in a <g> with id 'scene':
const mkScene = (elem: SVGElement )  => {
  const nextScene = document.createElementNS("http://www.w3.org/2000/svg", 'g')
  nextScene.id = 'scene'
  nextScene.appendChild(elem)
  return nextScene
}

// imperative action to update the DOM:
const updateScene = (nextScene: SVGElement) => {
  const prevScene = document.getElementById('scene')
  const svgElem = document.getElementById('app-svg')
  svgElem.replaceChild(nextScene, prevScene)
}

const main = () => {
  console.log('Hello, xstream SVG!')
  const containerElem = document.getElementById('app-container')
  const svgElem = document.getElementById('app-svg')
  const overlayElem = document.getElementById('app-overlay')

  console.log('svgElem: ', svgElem)

//  const offset = containerElem.offset()
//  console.log('container offset: ', offset)

  const moveS = fromEvent(overlayElem, 'mousemove')
  const mpointS = moveS.map(e => [e.offsetX,e.offsetY] )
  const circS = mpointS.map(mkCircle)
  const sceneS = circS.map(mkScene)

  sceneS.addListener({
    next: updateScene,
    error:err => console.error(err),
    complete: () => console.log('completed')
  })

}

window.onload = main
