let selectMoveTool = true
moveTool.style.backgroundColor = '#383838'
moveTool.style.border = '1px solid #202020'
moveTool.addEventListener('click', e =>{
    selectMoveTool = true
    moveTool.style.backgroundColor = '#383838'
    moveTool.style.border = '1px solid #202020'
    textTool.style.backgroundColor = ''
    textTool.style.border = ''
    selectedTool.classList.replace('fa-pencil-square-o','fa-arrows' )
    for(elm of itemsText){
        elm.style.display = 'none'
    }
})

textTool.addEventListener('click', e =>{
    selectMoveTool = false
    textTool.style.backgroundColor = '#383838'
    textTool.style.border = '1px solid #202020'
    moveTool.style.backgroundColor = ''
    moveTool.style.border = ''
    selectedTool.classList.replace('fa-arrows' , 'fa-pencil-square-o')
    for(elm of itemsText){
        elm.style.display = 'flex'
    }
})
bgColorInput.addEventListener('input', e =>{
    board.style.backgroundColor = bgColorInput.value
    
})  

newTextButton.addEventListener('click',e=>{
    boxinput.style.display = 'flex'
})

// ---------------------------------
function rgbToHex(rgb) {
    let result = rgb.match(/\d+/g); 
    if (!result) return "#000000";
    let r = parseInt(result[0]).toString(16).padStart(2, "0");
    let g = parseInt(result[1]).toString(16).padStart(2, "0");
    let b = parseInt(result[2]).toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
}
// -------------------------------------

let selected
textareabtn.addEventListener('click',e=>{
    let div = document.createElement('div')
    let text = textarea.value
    div.textContent =text
    div.classList.add('text')
    div.style.fontSize = `16px`
    div.style.fontFamily = 'ariyal'
    div.style.fontWeight = 'normal'
    board.appendChild(div)
    boxinput.style.display = 'none'
    div.addEventListener('click', e=> {
        move(div)
        texts = document.querySelectorAll('.text')
        for(elm of texts){
            elm.style.border = ``
        }
        div.style.border = '1px solid red'
        console.log(div.style.textAlign)
        selectSize.disabled = false
        selectFont.disabled = false
        setColor.disabled = false
        selected = div
        selectSize.value = div.style.fontSize
        setColor.value = rgbToHex(getComputedStyle(div).color)
        selectFont.value = div.style.fontFamily
        if(div.style.fontWeight == 'bold'){setBold.classList.add('se1')}
        else{setBold.classList.remove('se1')}

        if(div.style.fontStyle == 'italic'){setItalic.classList.add('se1')}
        else{setItalic.classList.remove('se1')}
        
        if(div.style.textDecoration == 'underline'){setUnderline.classList.add('se1')}
        else{setUnderline.classList.remove('se1')}
        
        if(div.style.textAlign == 'right') use(setRight)
        else if(div.style.textAlign == 'center') use(setCenter)
        else if(div.style.textAlign == 'justify') use(setJustify)
        else use(setLeft)
    })
})





selectSize.addEventListener('input',e=>{
    if(selected){
        let size = selectSize.value
        selected.style.fontSize = size
    }
})
setColor.addEventListener('input',e=>{
    if(selected){
        let color = setColor.value
        selected.style.color = color
    }
})
selectFont.addEventListener('input',e=>{
    if(selected){
        let font = selectFont.value
        selected.style.fontFamily = font
    }
})
setBold.addEventListener('click',e=>{
    if(selected){
        if(setBold.classList.contains('se1')){
            selected.style.fontWeight = 'normal'
        }else{
            selected.style.fontWeight = 'bold'
        }
        setBold.classList.toggle('se1')
    }
})
setItalic.addEventListener('click',e=>{
    if(selected){
        if(setItalic.classList.contains('se1')){
            selected.style.fontStyle = 'normal'
        }else{
            selected.style.fontStyle = 'italic'
        }
        setItalic.classList.toggle('se1')
    }
})
setUnderline.addEventListener('click',e=>{
    if(selected){
        if(setUnderline.classList.contains('se1')){
            selected.style.textDecoration = 'none'
        }else{
            selected.style.textDecoration = 'underline'
        }
        setUnderline.classList.toggle('se1')
    }
})



setRight.addEventListener('click',e=>{
    if(selected){
        use(setRight)
        selected.style.textAlign = 'right'
    }
})
setCenter.addEventListener('click',e=>{
    if(selected){
        use(setCenter)
        selected.style.textAlign = 'center'
    }
})
setLeft.addEventListener('click',e=>{
    if(selected){
        use(setLeft)
        selected.style.textAlign = 'left'
    }
})
setJustify.addEventListener('click',e=>{
    if(selected){
        use(setJustify)
        selected.style.textAlign = 'justify'
    }
})

function use (select){
    const items = [setRight,setCenter,setLeft,setJustify]
    for(elm of items){
         elm.classList.remove('se1')
    }
    if(select){
        select.classList.add('se1')
    }
}

document.body.addEventListener('click',e=>{
    if(e.target.nodeName == 'BODY' || e.target.id == 'board'){
        texts = document.querySelectorAll('.text')
        for(elm of texts){
            elm.style.border = ``
        }
        selectSize.disabled = true
        selectFont.disabled = true
        setColor.disabled = true
        setBold.classList.remove('se1')
        setItalic.classList.remove('se1')
        setUnderline.classList.remove('se1')
        use()
        selected = null
    }
})


function move (elm) {
    let x , y
    elm.onmousedown = e => {
            if(selectMoveTool){
            x = e.x - elm.offsetLeft
            y = e.y - elm.offsetTop
            document.onmousemove = e =>{
                elm.style.left = e.x - x + 'px'
                elm.style.top = e.y - y + 'px'
            }
            document.onmouseup = e => document.onmousemove = null
        }
    }
}



function downloadBoardAsImage() {
    html2canvas(board, { scale: 5 }).then(canvas => {
      
        const link = document.createElement('a');
        link.download = 'board.png';           
        link.href = canvas.toDataURL();      
        link.click();                         
    });
}

download.addEventListener('click', downloadBoardAsImage);
