$(function () {
  const buttonTogglerNavbar = $('.navbar-toggler')
  const navbarList = $('.navbar-list')

  buttonTogglerNavbar.click(() => {
    const isOpenNavbarList = !navbarList.hasClass('collapsed')
    console.log(isOpenNavbarList)

    if (isOpenNavbarList)
      navbarList.addClass('collapsed')
    else navbarList.removeClass('collapsed')
  })
})