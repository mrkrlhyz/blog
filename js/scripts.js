var nav = document.querySelectorAll('.nav');
var categories = document.querySelector('#categories');
var tags = document.querySelector('#tags');
var archives = document.querySelector('#archives');

archives.addEventListener('click', () => {
    hide("categories");
    hide("tags");
    let menu = document.querySelector('#archives-menu');
    toggle(menu);
});

categories.addEventListener('click', () => {
    hide("archives");
    hide("tags");
    let menu = document.querySelector('#categories-menu');
    toggle(menu);
});


tags.addEventListener('click', () => {
    hide("archives");
    hide("categories");
    let menu = document.querySelector('#tags-menu');
    toggle(menu);
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
    let amenu = document.querySelector('#archives-menu');
    cmenu.className = 'menu hidden';
    tmenu.className = 'menu hidden';
    amenu.className = 'menu hidden';
}

toggleClass = (param, c) => {
    // console.log(`${param.id}, ${c}`);
    if (param.className.includes(c)) {
        param.className = param.className.replace(c, '');
        return;
    }
    param.className += ` ${c}`;
}