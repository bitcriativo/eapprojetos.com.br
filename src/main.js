import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './assets/sass/app.sass';

$(function () {
  const buttonTogglerNavbar = $('.navbar__toggler')
  const navbarList = $('.navbar__nav')

  buttonTogglerNavbar.click(() => {
    const isOpenNavbarList = !navbarList.hasClass('navbar__nav--collapsed')
    console.log(isOpenNavbarList)

    if (isOpenNavbarList)
      navbarList.addClass('navbar__nav--collapsed')
    else navbarList.removeClass('navbar__nav--collapsed')
  })
})