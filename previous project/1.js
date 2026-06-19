let profilepic=document.getElementById("profile-pic");
let inputfile=document.getElementById("input-file");
inputfile.onchange=function(){
    profilepic.src=URL.createObjectURL(inputfile.files[0]);
}


function goToFirstPage() {
    // Redirect to the first page
    window.location.href = 'index.html';
}

//prints page

function printPage() {
    window.print();
}