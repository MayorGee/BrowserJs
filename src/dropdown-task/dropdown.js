const dropDownTree = document.getElementById('dropdown-tree');

dropDownTree.addEventListener('click', (ev) => {
    const target = ev.target;

    if(target.tagName !== 'SPAN') {
        return;
    }

    const child = target.parentNode.querySelector('.dropdown__nested-list');
    child?.classList.toggle('hide');
});