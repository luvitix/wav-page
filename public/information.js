


function load() {
    // 현재 URL 가져오기
    var currentUrl = window.location.href;

    
    var id1 = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

    // 이미지 태그 업데이트
    var img = document.getElementById('viewpoint');
    img.src = `objekt-front-page/${id1}.png`;

    updateContent(id1)
    
}

function flip() {
    // 클릭된 이미지의 src 속성을 얻음

    var clickedImage = document.getElementById("viewpoint");
    var originalImage = clickedImage.src;

    finder = originalImage.split("page/")
    trigger = finder[0].split("kt-")

    if (trigger[1] == "front-") {

        clickedImage.src = `objekt-zback-page/${finder[1]}`

    } else if (trigger[1] == "zback-") {

        clickedImage.src = `objekt-front-page/${finder[1]}`

    } else {
        console.log("오류", trigger)
    }
}

async function updateContent(objektId) {
    try {
        const response = await fetch(`description/${objektId}.txt`);
        const data = await response.text();
        
        var lines = data.split('\n');
        
        var set_Element = ['descrip', 'number', 'origin', 'makers', 'secret']
        for (i = 0; i < set_Element.length; i++) { set_Element[i] = document.getElementById(set_Element[i]) }
        var currentUrl = window.location.href;

        var id1 = currentUrl.substring(currentUrl.lastIndexOf('/') + 1)
        console.log(id1)

        if (lines[0].split(" : ")[1] == undefined) {
            const now_content = await test(id1);
            console.log(now_content.data());

            if (now_content.exists) {
                objekt_numbering = `${now_content.data()['S_Number']} ${now_content.data()['S_Name']} ${now_content.data()['Season']} ${now_content.data()['O_Number']}`

                set_Element[0].innerHTML = `<strong>Description</strong><br>${now_content.data()['Description']}`
                set_Element[1].innerHTML = `<strong>Number</strong><br>${objekt_numbering}`
                set_Element[2].innerHTML = `<strong>origin</strong><br><a href=${now_content.data()['origin']}><button>원본 보러가기</button></a>`
                set_Element[3].innerHTML = `<strong>makers</strong><br><a href=${now_content.data()['maker']}><button>${now_content.data()['maker_name']} 트위터</button></a>`
                set_Element[4].innerHTML = `<strong>Grid_Key</strong><br>${now_content.data()['imsi_key']}`

                document.getElementById("objekt").innerText = objekt_numbering

            } else {
                window.location.href = "error.html";
            }
        } else {
            set_Element[0].innerHTML = `<strong>${lines[0].split(" : ")[0]}</strong><br>${lines[0].split(" : ")[1]}`
            set_Element[1].innerHTML = `<strong>${lines[1].split(" : ")[0]}</strong><br>${lines[1].split(" : ")[1]}`
            set_Element[2].innerHTML = `<strong>${lines[2].split(" : ")[0]}</strong><br><a href=${lines[2].split(" : ")[1]}><button>원본 보러가기</button></a>`
            set_Element[3].innerHTML = `<strong>${lines[3].split(" : ")[0]}</strong><br><a href=${lines[3].split(" : ")[1]}><button>${lines[4].split(" : ")[1]} 트위터</button></a>`
            set_Element[4].innerHTML = `<strong>${lines[5].split(" : ")[0]}</strong><br>${lines[5].split(" : ")[1]}`
            document.getElementById("objekt").innerText = `${lines[1].split(" : ")[1]}`;
        }
    } catch (error) {
        console.error('데이터를 업데이트하는 중 오류 발생:', error);
    }
}

async function test(id1) {
    try {
        var now_content = await DB.collection('objekt').doc(id1).get();
        return now_content;
    } catch (error) {
        console.error("예외가 발생했습니다:", error);
    }
}


function downloadImage() {

    var clickedImage = document.getElementById("viewpoint");
    var originalImage = clickedImage.src;

    finder = originalImage.split("page/")
    trigger = finder[0].split("kt-")

    function filePath () {
        if (trigger[1] == "front-") {

            return `objekt-front-page/${finder[1]}`

        } else if (trigger[1] == "zback-") {

            return `objekt-zback-page/${finder[1]}`

        } else {
            console.log("오류", trigger)
        }
    }

    // a 태그를 생성하고 속성 설정
    const a = document.createElement("a");
    a.href = filePath();
    a.download = "tripleS.png";

    // a 태그를 클릭하여 파일 다운로드 시작
    a.click();
}