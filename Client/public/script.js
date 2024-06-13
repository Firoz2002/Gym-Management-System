const deleteEl = document.querySelectorAll('.delete');

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function show() {
    for(let i=0; i<deleteEl.length; i++) {
        deleteEl[i].style.display = 'block';
    }
    
    const nodeList = document.querySelectorAll('.checkbox-column');
    for(let i=0; i<nodeList.length; i++) {
        nodeList[i].style.display = 'block';
    }
}

function hide() {
    for(let i=0; i<deleteEl.length; i++) {
        deleteEl[i].style.display = 'none';
    }

    const nodeList = document.querySelectorAll('.checkbox-column');
    for(let i=0; i<nodeList.length; i++) {
        nodeList[i].style.display = 'none';
    }
}