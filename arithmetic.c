
#include <stdio.h>


int add1(value){
    int result = 1 + value;
    //printf("%d\n", result);
    return result;
}

int sub1(value){
    int result = 1 - value;
    //printf("%d\n", result);
    return result;
}

int main(void){
    int number = 10;
    //add1(number);
    //sub1(number);
    printf("%d\n", add1(number));
    printf("%d\n", sub1(number));
    printf("hello world");
    return 0;
}
