NodeList.prototype.forEach = Array.prototype.forEach

const lis = document.querySelectorAll('li')
const successPercent = document.querySelector('.js-success-percent')
const successCount = document.querySelector('.js-success')
const allCount = document.querySelector('.js-all')

app()
const interv = setInterval(app, 25)
// window.onload = () => setTimeout(() => clearInterval(interv), 1000)

function app() {
    lis.forEach(li => {
        const ads = li.querySelector('.js-block')
        const rez = li.querySelector('.js-result')
        if (!ads || !rez) return

        const adsLoaded = ads.clientWidth !== 0 && ads.clientHeight !== 0

        rez.innerHTML = adsLoaded ? 'загружен' : 'заблокирован'
        rez.classList.remove(adsLoaded ? 'green' : 'red')
        rez.classList.add(adsLoaded ? 'red' : 'green')
    })

    const all = document.querySelectorAll('.js-result').length
    const success = document.querySelectorAll('.js-result.green').length

    allCount.innerHTML = all
    successCount.innerHTML = success
    successPercent.innerHTML = (success == 0 ? 0 : Math.round(success/all * 10000)/100) + '%'
}
