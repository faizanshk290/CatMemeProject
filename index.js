import {catsData} from '/data.js'

const emotionsRadiosContainerEl = document.getElementById('emotions-radio-container')

const getImageBtnEl = document.getElementById('get-img-btn')

const modalContainerEl = document.getElementById('modal-container')

const modalCloseBtnEl = document.getElementById('modal-close-btn')

emotionsRadiosContainerEl.addEventListener('change',highlightRadioContainer)

getImageBtnEl.addEventListener('click',renderCat)

modalCloseBtnEl.addEventListener('click',closeModalBtn)

function closeModalBtn()
{
    modalContainerEl.style.display = 'none'
}

function renderCat()
{
    const catObject = getCat()
    modalContainerEl.style.display = 'flex'
    document.getElementById("modal-inner").innerHTML =
    `
        <image class="modal-cat-image" src="images/${catObject.image}">
    `
}

function getCat()
{
    const isRadioChecked = document.querySelector('input[type="radio"]:checked')
    if(isRadioChecked)
    {
        const emotion = document.querySelector('input[type="radio"]:checked').value
        const isGifChecked = document.getElementById('gifs-only').checked
        const matchingCatsArray = catsData.filter((cats)=>
        {
            if(isGifChecked)
            {
                return cats.emotionTags.includes(emotion) && cats.isGif
            }
            else
            {
                return cats.emotionTags.includes(emotion)
            }
        })
        const getRandomIndex = Math.floor(Math.random() * matchingCatsArray.length)
        return matchingCatsArray[getRandomIndex]   
    }
}

function highlightRadioContainer(e)
{
    const radioEl = document.getElementById(e.target.id)
    const radioContainers = document.getElementsByClassName('highlight-radio-container')
    for(let radio of radioContainers)
    {
        radio.classList.remove('highlight-radio-container')
    }
    radioEl.parentElement.classList.add('highlight-radio-container')
}

function getCatsEmotionsArray()
{
    let catEmotionsArray = []
    for(let cats of catsData)
    {
        for(let catEmotions of cats.emotionTags)
        {
            if(!catEmotionsArray.includes(catEmotions))
            {
                catEmotionsArray.push(catEmotions)
            }
        }
    }
    return catEmotionsArray
}

function renderCatsEmotions(catEmotionsArray)
{
    let catsEmotionsString = ''
    for(let emotion of catEmotionsArray)
    {
        catsEmotionsString += 
        `
            <div class="radio-container">
                <label for="${emotion}">${emotion}</label>
                <input type="radio" id="${emotion}" name="cat-emotions" value="${emotion}">
            </div>
        `
    }
    emotionsRadiosContainerEl.innerHTML = catsEmotionsString
}

renderCatsEmotions(getCatsEmotionsArray())