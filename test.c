
int add1(value){
    int result = 1 + value;
    printf("%d\n", result);
    return result;
}


int main(void){
    int number = 10;
    add1(number);
    printf("%d\n", add1(number));
    printf("%d\n", number);
    printf("hello world");
    return 0;
}
