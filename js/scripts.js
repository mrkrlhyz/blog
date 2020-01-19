
var nav = document.querySelectorAll('.nav');
var categories = document.querySelector('#categories');
var tags = document.querySelector('#tags');


categories.addEventListener('click', () => {
    hide("tags");
    let cmenu = document.querySelector('#categories-menu');
    toggle(cmenu);
});


tags.addEventListener('click', () => {
    hide("categories");
    let tmenu = document.querySelector('#tags-menu');
    toggle(tmenu);
})

deactivate = (nav, node) => {
    nav.forEach(n => {
        if (n != node) n.className = 'nav';
    });
}

nav.forEach(n => {
    n.addEventListener('click', async (event) => {
        await deactivate(nav, n);
        toggle(n);
    });
});

show = (m) => {
    let menu = document.querySelector(`#${m}-menu`);
    menu.className = 'menu';
}

hide = (m) => {
    let menu = document.querySelector(`#${m}-menu`);
    menu.className = 'menu hidden';
}

toggle = (param) => {
    let m = param.className;
    if (m.includes('menu')) {
        toggleClass(param, 'hidden');
    }
    if (m.includes('nav'))
        toggleClass(param, 'active');
}

hideAll = () => {
    let cmenu = document.querySelector('#categories-menu');
    let tmenu = document.querySelector('#tags-menu');
    cmenu.className = 'menu hidden';
    tmenu.className = 'menu hidden';
}

toggleClass = (param, c) => {
    // console.log(`${param.id}, ${c}`);
    if (param.className.includes(c)) {
        param.className = param.className.replace(c, '');
        return;
    }
    param.className += ` ${c}`;
}