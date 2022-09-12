const a_button = document.getElementById('announce_button')
const f_button = document.getElementById('fetch_button')
const m_button = document.getElementById('maintain_button')
const e_button = document.getElementById('event_button')
const p_event = document.getElementById('past_event')
const c_event = document.getElementById('current_event')
const f_event = document.getElementById('future_event')
const e_cancel = document.getElementById('event_cancel')
const event_list = document.getElementById('event_list')
const m_blank = document.getElementById('maintain_blank')
const f_blank = document.getElementById('fetch_blank')
const a_cancel = document.getElementById('announce_cancel')
const f_cancel = document.getElementById('fetch_cancel')
const f_article = document.getElementById('fetch_article')
const fetch_blank = document.getElementById('fetch_blank')
const m_cancel = document.getElementById('maintain_cancel')
const maintain_blank = document.getElementById('maintain_blank')
const m_article = document.getElementById('maintain_article')
const e_blank = document.getElementById('events')
const a_article = document.getElementById('announce_article')
const announce_blank = document.getElementById('announce_blank')
const announce1 = document.getElementById('announce_1')
const announce2 = document.getElementById('announce_2')
const announce3 = document.getElementById('announce_3')
const announce4 = document.getElementById('announce_4')
const announce5 = document.getElementById('announce_5')
const fetch1 = document.getElementById('fetch_1')
const fetch2 = document.getElementById('fetch_2')
const fetch3 = document.getElementById('fetch_3')
const fetch4 = document.getElementById('fetch_4')
const fetch5 = document.getElementById('fetch_5')
const maintain1 = document.getElementById('maintain_1')
const maintain2 = document.getElementById('maintain_2')
const maintain3 = document.getElementById('maintain_3')
const maintain4 = document.getElementById('maintain_4')
const maintain5 = document.getElementById('maintain_5')
const e_page = document.getElementById('event_page')
const e_article = document.getElementById('event_article')
e_cancel.style.display = ''


function movePage(pageIdx) {
    const pages = [
        document.getElementById('announce_page'),
        document.getElementById('fetch_page'),
        document.getElementById('maintain_page'),
        document.getElementById('event_page'),
    ]
    const buttons = [
        document.getElementById('announce_button'),
        document.getElementById('fetch_button'),
        document.getElementById('maintain_button'),
        document.getElementById('event_button'),
    ]
    const blanks = [
        document.getElementById('announce_blank'),
        document.getElementById('fetch_blank'),
        document.getElementById('maintain_blank')
    ]
    const titles = [
        document.getElementById('announce_page_text'),
        document.getElementById('fetch_page_text'),
        document.getElementById('maintain_page_text'),
        document.getElementById('event_page_text'),
    ]
    for (let i = 0; i < pages.length; i++) {
        const isVisible = i === pageIdx
        buttons[i].style.backgroundColor = isVisible ? 'rgba(254,138,139,1)' : ''
        titles[i].style.display = isVisible ? '' : 'none'
        pages[i].style.opacity = isVisible ? '1' : '0'
        pages[i].style.transition = isVisible ? 'opacity 1s ease' : 'opacity 1s ease'
        pages[i].style.zIndex = isVisible ? '1' : '0'
    }
}


a_button.onclick = () => {
    movePage(0)
    event_list.style.display = 'none'
    m_blank.style.display = 'none'
    f_blank.style.display = 'none'
    a_article.style.display = 'none'
    f_article.style.display = 'none'
    announce_blank.style.display = ''
    m_article.style.display = 'none'
    e_page.style.display = 'none'
    console.log('e_cancel is disalbed')
    
}

f_button.onclick = () => {
    movePage(1)
    event_list.style.display = 'none'
    m_blank.style.display = 'none'
    f_blank.style.display = ''
    a_article.style.display = 'none'
    f_article.style.display = 'none'
    // e_cancel.style.display = 'none'
    announce_blank.style.display = 'none'
    m_article.style.display = 'none'
    e_page.style.display = 'none'
    console.log('e_cancel is disalbed')
}

m_button.onclick = () => {
    movePage(2)
    event_list.style.display = ''
    m_blank.style.display = ''
    f_blank.style.display = 'none'
    a_article.style.display = 'none'
    f_article.style.display = 'none'
    // e_cancel.style.display = 'none'
    announce_blank.style.display = 'none'
    m_article.style.display = 'none'
    e_page.style.display = 'none'
    console.log('e_cancel is disalbed')
    
}

e_button.onclick = () => {
    movePage(3)
    event_list.style.display = ''
    m_blank.style.display = 'none'
    f_blank.style.display = 'none'
    a_article.style.display = 'none'
    f_article.style.display = 'none'
    e_cancel.style.display = 'none'
    announce_blank.style.display = 'none'
    m_article.style.display = 'none'
    e_blank.style.display = 'none'
    e_page.style.display = ''
    e_article.style.display = 'none'
    p_event.style.display = ''
    c_event.style.display = ''
    f_event.style.display = ''
    console.log('e_cancel is disalbed')
}

p_event.onclick = () => {
    p_event.style.display = 'none'
    c_event.style.display = 'none'
    f_event.style.display = 'none'
    e_cancel.style.display = ''
    e_blank.style.display = ''
    
}

c_event.onclick = () => {
    p_event.style.display = 'none'
    c_event.style.display = 'none'
    f_event.style.display = 'none'
    e_cancel.style.display = ''
    e_blank.style.display = ''
}

f_event.onclick = () => {
    p_event.style.display = 'none'
    c_event.style.display = 'none'
    f_event.style.display = 'none'
    e_cancel.style.display = ''
    e_blank.style.display = ''
}

e_cancel.onclick = () => {
    p_event.style.display = ''
    c_event.style.display = ''
    f_event.style.display = ''
    // e_cancel.style.display = 'none'
    e_blank.style.display = 'none'
    e_article.style.display = 'none'
    console.log('e_cancel is disalbed')
    event_list.style.display = ''
}

a_button.click()




announce1.onclick = () => {
    announce_blank.style.display = 'none'
    a_article.style.display = ''
}

announce2.onclick = () => {
    announce_blank.style.display = 'none'
    a_article.style.display = ''
}

announce3.onclick = () => {
    announce_blank.style.display = 'none'
    a_article.style.display = ''
}

announce4.onclick = () => {
    announce_blank.style.display = 'none'
    a_article.style.display = ''
}

announce5.onclick = () => {
    announce_blank.style.display = 'none'
    a_article.style.display = ''
}



a_cancel.onclick = () => {
    a_article.style.display = 'none'
    announce_blank.style.display = ''
}

f_cancel.onclick = () => {
    f_article.style.display = 'none'
    fetch_blank.style.display = ''
}

m_cancel.onclick = () => {
    m_article.style.display = 'none'
    maintain_blank.style.display = ''
}



fetch1.onclick = () => {
    fetch_blank.style.display = 'none'
    f_article.style.display = ''
}

fetch2.onclick = () => {
    fetch_blank.style.display = 'none'
    f_article.style.display = ''
}

fetch3.onclick = () => {
    fetch_blank.style.display = 'none'
    f_article.style.display = ''
}

fetch4.onclick = () => {
    fetch_blank.style.display = 'none'
    f_article.style.display = ''
}

fetch5.onclick = () => {
    fetch_blank.style.display = 'none'
    f_article.style.display = ''
}



maintain1.onclick = () => {
    maintain_blank.style.display = 'none'
    m_article.style.display = ''
}

maintain2.onclick = () => {
    maintain_blank.style.display = 'none'
    m_article.style.display = ''
}

maintain3.onclick = () => {
    maintain_blank.style.display = 'none'
    m_article.style.display = ''
}

maintain4.onclick = () => {
    maintain_blank.style.display = 'none'
    m_article.style.display = ''
}

maintain5.onclick = () => {
    fetch_blank.style.display = 'none'
    m_article.style.display = ''
}

const e_1 = document.getElementById('event_1')
const e_2 = document.getElementById('event_2')
const e_3 = document.getElementById('event_3')
const e_4 = document.getElementById('event_4')
const e_5 = document.getElementById('event_5')

e_1.onclick = () => {
    e_cancel.style.display = ''
}
e_2.onclick = () => {
    e_cancel.style.display = ''
}
e_3.onclick = () => {
    e_cancel.style.display = ''
}
e_4.onclick = () => {
    e_cancel.style.display = ''
}
e_5.onclick = () => {
    e_cancel.style.display = ''
}