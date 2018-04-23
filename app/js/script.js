$( document ).ready(function() {
    console.log( "ready!" );
    changeSkill();

});

var skillName = ['developer,', 'creative-mind,', 'digital all-rounder,']

var skillColor = ['fh-orange', 'fh-blue', 'fh-red'];

var roundCounter = 0;

function changeSkill(){
    console.log("method");
    roundCounter++;
    console.log(skillColor[(roundCounter - 1) % skillColor.length]);
    $('.fh-tint').removeClass(skillColor[(roundCounter - 1) % skillColor.length]);
    $('.fh-tint').addClass(skillColor[roundCounter % skillColor.length]);
    $('.fh-skill').removeClass(skillColor[(roundCounter - 1) % skillColor.length]);
    $('.fh-skill').addClass(skillColor[roundCounter % skillColor.length]);
    $('.fh-social-links > a').removeClass(skillColor[(roundCounter - 1) % skillColor.length]);
    $('.fh-social-links > a').addClass(skillColor[roundCounter % skillColor.length]);
    $('.fh-skill').text(skillName[roundCounter % skillColor.length]);
    setTimeout(function(){
      changeSkill();
    }, 2000);
}
