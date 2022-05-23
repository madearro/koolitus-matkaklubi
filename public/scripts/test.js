lisaMatkElement.onclick = async () => {
    const lisaPealkiri = lisaPealkiriElement.value;
    const lisaKirjeldus = lisaKirjeldusElement.value;
    const lisaPilt = lisaPiltElement.value;
    if (lisaPealkiri === '' || lisaKirjeldus === '' || lisaPilt === '') {
        sonumElement.innerHTML = 'Palun täida kõik väljad!'
        sonumElement.style.color = 'red';
        return;
    }
 else {
    lisaPealkiri.value = '';
    lisaKirjeldus.value = '';
    lisaPilt.value = '';
            sonumElement.innerHTML = 'Matk lisatud'
            sonumElement.style.color = 'green';}
}