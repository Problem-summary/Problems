var language_flag=1;
function fun(){
    document.write(like[language_flag]);
}
function qiehuan(){
    if(language_flag==1){
        language_flag=0;
        document.write(love[language_flag]);
        fun();
    }
    language_flag==1;
}