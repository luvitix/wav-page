
function load() {
    // 현재 URL 가져오기
    var currentUrl = window.location.href;

    
    var id1 = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

    // 이미지 태그 업데이트
    var img = document.getElementById('viewpoint');
    img.src = "objekt-front-page/" + id1 + ".png";

    updateContent(id1)
}

function flip() {
    // 클릭된 이미지의 src 속성을 얻음

    var clickedImage = document.getElementById("viewpoint");
    var originalImage = clickedImage.src;

    finder = originalImage.split("page/")
    trigger = finder[0].split("-")

    if (trigger[1] == "front") {

        clickedImage.src = `objekt-zback-page/${finder[1]}`

    } else if (trigger[1] == "zback") {

        clickedImage.src = `objekt-front-page/${finder[1]}`

    } else {
        console.log("오류", trigger)
    }
}

function updateContent(objektId) {
    fetch(`description/${objektId}.txt`)  // 경로/파일.txt에 실제 파일 경로를 입력하세요.
        .then(response => response.text())
        .then(data => {
            // 가져온 텍스트 데이터를 줄 단위로 나누어 객체로 변환
            var lines = data.split('\n');
            
            var set_Element = ['descrip', 'number', 'origin', 'makers', 'secret']
            for (i = 0; i < set_Element.length; i++) { set_Element[i] = document.getElementById(set_Element[i]) }
            // HTML 엘리먼트에 값을 설정

            set_Element[0].innerHTML = `<strong>${lines[0].split(" : ")[0]}</strong><br>${lines[0].split(" : ")[1]}`
            set_Element[1].innerHTML = `<strong>${lines[1].split(" : ")[0]}</strong><br>${lines[1].split(" : ")[1]}`
            set_Element[2].innerHTML = `<strong>${lines[2].split(" : ")[0]}</strong><br><a href=${lines[2].split(" : ")[1]}><button>원본 보러가기</button></a>`
            set_Element[3].innerHTML = `<strong>${lines[3].split(" : ")[0]}</strong><br><a href=${lines[3].split(" : ")[1]}><button>${lines[4].split(" : ")[1]} 트위터</button></a>`
            set_Element[4].innerHTML = `<strong>${lines[5].split(" : ")[0]}</strong><br>${lines[5].split(" : ")[1]}`
            document.getElementById("objekt").innerText = `${lines[1].split(" : ")[1]}`;

            // 추가로 필요한 업데이트 로직을 여기에 추가할 수 있습니다.
        })
        .catch(error => console.error('파일을 가져오는 중 오류 발생:', error));
}