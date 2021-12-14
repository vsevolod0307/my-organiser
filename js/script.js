const btnsCalc = document.querySelectorAll('.btn'),
    calcInner = document.querySelector('.calc_inner'),
    deleted = document.querySelector('.deleted'),
    sum = document.querySelector('.sum');

function btnColor(color, btn) {
    btn.style.backgroundColor = color;
}

btnsCalc.forEach(btn => {
    btn.addEventListener('click', () => {
        calcInner.value += btn.innerHTML;      
    });

    btn.addEventListener('mousedown',() => {
        btnColor('rgb(67, 125, 173)', btn);
    });

    btn.addEventListener('mouseup',() => {
        btnColor('rgb(197, 199, 201)', btn);
    });
});

function calcSum() {
    let val = calcInner.value;
    if(val.includes('+')) {
        let resBefore = val.split('+')[0],
        resAfter = val.split('+')[1];
        val = +resBefore + +resAfter;
    } else if(val.includes('-')) {
        let resBefore = val.split('-')[0],
        resAfter = val.split('-')[1];
        val = +resBefore - +resAfter;
    } else if(val.includes('/')) {
        let resBefore = val.split('/')[0],
        resAfter = val.split('/')[1];
        val = +resBefore / +resAfter;
    } else if(val.includes('*')) {
        let resBefore = val.split('*')[0],
        resAfter = val.split('*')[1];
        val = +resBefore * +resAfter;
    }
        calcInner.value = val;
}

sum.addEventListener('click', () => {
    calcSum();
});

document.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        calcSum();
    }
});

deleted.addEventListener('click', () => {
    calcInner.value = '';
});

let startSec = document.querySelector('.start'),
    sec = document.querySelector('.sec'),
    min = document.querySelector('.min'),
    msec = document.querySelector('.msec'),
    pauseSec = document.querySelector('.pause'),
    stopSec = document.querySelector('.stop');

function seconds() {
    +sec.innerHTML++;
    if(+sec.innerHTML > 59) {
        sec.innerHTML = 0;
    }
    +sec.innerHTML
}

function milliseconds() {
    +msec.innerHTML++;
    if(+msec.innerHTML > 99) {
        msec.innerHTML = 0;
        console.log('try');
    }
    +msec.innerHTML
}

function minutes() {
    +min.innerHTML++;
}

startSec.addEventListener('click', () => {
    let timerMsec = setInterval(milliseconds, 10);
    let timerSec = setInterval(seconds, 1000);
    let timerMin = setInterval(minutes, 60000);
    startSec.style.display = 'none';
    stopSec.style.marginLeft = '120px';
    pauseSec.style.zIndex = '1';
    pauseSec.addEventListener('click', () => {
        clearInterval(timerMsec);
        clearInterval(timerSec);
        clearInterval(timerMin);
        pauseSec.style.zIndex = '-2';
        startSec.style.display = 'block';
        stopSec.style.marginLeft = '';
    });

    stopSec.addEventListener('click', () => {
        clearInterval(timerMsec);
        clearInterval(timerSec);
        clearInterval(timerMin);
        sec.innerHTML = '00';
        msec.innerHTML = '00';
        min.innerHTML = '00';
        pauseSec.style.zIndex = '-2';
        startSec.style.display = 'block';
        stopSec.style.marginLeft = '';
    });
});

const mainMenu = document.querySelector('.main_menu'),
    mainContent = document.querySelectorAll('.main_box'),
    mainLink = document.querySelectorAll('.main_link a');

function showContent(n) {
    mainContent[n].style.display = 'flex';
    mainLink[n].classList.add('active_link');
}

hideContent();
showContent(0);

function hideContent() {
    mainContent.forEach((item) => {
        item.style.display = 'none';
    });
    mainLink.forEach(link => {
        link.classList.remove('active_link');
    });
}

mainMenu.addEventListener('click', (event) => {
    let target = event.target;

    mainLink.forEach((link, i) => {
        if(target === link) {
            hideContent();
            showContent(i);
        }
    });
    
    
});

const btnDiaryMood = document.querySelector('.diary_mood_btn'),
    moodSelect = document.querySelectorAll('.mood_link'),
    moodSelectImg = document.querySelectorAll('.mood_link img'),
    addPost = document.querySelector('.diary'),
    inputDate = document.querySelector('.diary_date'),
    inputDescr = document.querySelector('.diary_descr'),
    postWrap = document.querySelector('.post_wrap');

    let mood,
    state = false;

    function parentPost(parent, input) {
        parent.append(input.value);
        input.value = '';
    }

    function moodPost() {
        moodSelectImg.forEach((item) => {
            item.addEventListener('click', () => {
                if(!item.classList.contains('check')) {
                    moodSelectImg.forEach(img => {
                        img.classList.remove('check');
                    });
                    item.classList.add('check');
                    state = true;
                }

                let moodSrc = item.getAttribute('src');
                mood = moodSrc;
            });
        });
        return mood;
    }

    let result = moodPost();

    addPost.addEventListener('submit', (event) => {
        event.preventDefault();

        console.log('kasjhdxc');
        
        const elemImg = document.createElement('img'),
            elemDate = document.createElement('div'),
            elemDescr = document.createElement('div'),
            elemPost = document.createElement('div');

        postWrap.append(elemPost);
        elemPost.classList.add('new_post');
        elemPost.append(elemDate);
        elemDate.classList.add('post_date');
        elemPost.append(elemImg);
        elemImg.classList.add('post_mood');
        elemPost.append(elemDescr);
        elemDescr.classList.add('post_descr');

        if(inputDate.value == '' || inputDescr.value == '' || state === false) {
            elemPost.style.display = 'none';
        } else {
            elemPost.style.display = 'block';
        }

        elemImg.setAttribute('src', moodPost());
        elemImg.setAttribute('alt', 'emoji');

        parentPost(elemDescr, inputDescr);
        parentPost(elemDate, inputDate);

        moodSelectImg.forEach(img => {
            if(img.classList.contains('check')) {
                img.classList.remove('check');
            }
        });

        moodShow();
    })



    function moodShow() {
        moodSelect.forEach(item => {
            item.classList.toggle('mood_show');
        });
    }

btnDiaryMood.addEventListener('click', moodShow);
    
    // const date = new Date(),
    //     year = date.getFullYear(),
    //     month = date.getUTCMonth(),
    //     today = date.getDate(),
    //     firstDay = new Date(year, month, 1),
    //     firstWeekDay = firstDay.getDay(),
    //     oneHour = 1000 * 60 * 60,
    //     oneDay = oneHour * 24,
    //     nextMonth = new Date(year, month + 1, 1),
    //     lastDay = Math.ceil((nextMonth.getTime() - firstDay.getTime() - oneHour)/oneDay),
    //     calendarMonth = document.querySelectorAll('.calendar_month'),
    //     arrMonth = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    //     arrDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

    //     console.log(firstWeekDay);

    //     const cell = document.createElement('div');

    //     calendarMonth.forEach((item, i) => {

    //         if(i == month) {
    //             item.innerHTML += `<div class="calendar_month-name blue">${arrMonth[i]}</div>`;
    //             for(let i = 1; i <= arrDays.length; i++) {
    //                 if(i == firstWeekDay+1) {
    //                     item.innerHTML += `<div class="calendar_item day blue">${arrDays[i-1]}</div>`; 
    //                 } else {
    //                     item.innerHTML += `<div class="calendar_item day">${arrDays[i-1]}</div>`;  
    //                 }
    //             }
    //             for(let i = 0; i <= 2; i++) {
    //                 item.innerHTML += `<div class="calendar_item blank"></div>`;
    //             }
    //             for(let i = 1; i <= 31; i++) {
    //                 if(i == today) {
    //                     item.innerHTML += `<div class="calendar_item blue">${i}</div>`;
    //                 } else {
    //                     item.innerHTML += `<div class="calendar_item">${i}</div>`;
    //                 }
    //             }
                
    //         } else {
    //             item.innerHTML += `<div class="calendar_month-name">${arrMonth[i]}</div>`;
    //             for(let i = 1; i <= arrDays.length; i++) {
    //                 item.innerHTML += `<div class="calendar_item day">${arrDays[i-1]}</div>`;
    //             }
    //             for(let i = 1; i <= 31; i++) {
    //                 item.innerHTML += `<div class="calendar_item">${i}</div>`;
    //             }
                
    //         }
    //     });

    const calendarMonth = document.querySelectorAll('.calendar_month'),
        arrMonth = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

        function calendarRender(parent, year, month, monthName) { 

            let mon = month - 1;
            let d = new Date(year, mon);
 
            let table = `<div>${monthName}</div><table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>`;
 
            for (let i = 0; i < getDay(d); i++) {
                table += '<td></td>';
            }

            while (d.getMonth() == mon) {
                table += '<td>' + d.getDate() + '</td>';
            
                if (getDay(d) % 7 == 6) {
                table += '</tr><tr>';
                }
            
                d.setDate(d.getDate() + 1);
            }

            if (getDay(d) != 0) {
                for (let i = getDay(d); i < 7; i++) {
                  table += '<td></td>';
                }
            }

            table += '</tr></table>';
 
            parent.innerHTML = table;
        }

        function getDay(date) {
            let day = date.getDay();
            if (day == 0) day = 7;
            return day - 1;
        }

        calendarMonth.forEach((item, i) => {
            calendarRender(item, 2021, i+1, arrMonth[i]);
        });

        
