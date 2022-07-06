#include<iostream>
#include<stdlib.h>
#include <unistd.h>  
#include<time.h>
#include <algorithm>
//https://www.reddit.com/r/unexpectedcommunism/comments/v3ue0n/our/



using namespace std;

const int terminalX = 80;
const int terminalY = 23;
int snake_size= 4;
class Random{
    public:
    int x;
    int y;
};

Random snake[4];

Random RanPosition(){

    Random position;
    srand(time(0));

    position.x= (rand() % terminalX )+1;
srand(time(0));

    position.y= (rand() % terminalY )+ 1;
    return position;

}
Random food = RanPosition() ;
Random move = {0,0};
void move_snake(int snake_size, Random snake[]){
     char input;
    input = getchar();

    if(input == 'w'&& ::move.y==0){
        ::move.x = 0;
        ::move.y=-1;
    }
    else if(input == 'a' && ::move.x==0){
        ::move.y = 0;
        ::move.x= -1;
    }
    else if(input == 's' && ::move.y==0){
        ::move.x = 0;
        ::move.y= 1;
    }
    else if(input == 'd' && ::move.x==0){
        ::move.y = 0;
      
       ::move.x= 1;
    }

}



//check for collision
bool collision(Random snake[], int snake_size){
    for(int i = 1; i < snake_size; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            return true;
        }
    }
    return false;
}
//check for food
bool Checkfood(Random snake[], int snake_size){
    return (snake[0].x == ::food.x && snake[0].y == ::food.y);
}
//check for win
bool search(Random snake[], Random value){
    for(int i = 0; i < snake_size; i++){
        if(snake[i].x == value.x && snake[i].y == value.y){
            return true;
        }
    }
    return 0;
}
int render(){
    Random CurrentPosition;
    // os independent code
    #ifdef _WIN32
    system("cls");
    #else
    system("clear");
    #endif
    char c[4]={'#','@','o',' '};
    short id;
   for (int y=1; y<=terminalY;y++){
    CurrentPosition.y = y ;
       for (int x=1; x<=terminalX;x ++){
        CurrentPosition.x = x ;

        if (x == 1 || x == terminalX||y == 1 || y == terminalY) id = 0;
        else if (x==food.x && y==food.y)id = 1;
        else if (search(snake,CurrentPosition)) id = 2;
        else id =3;
       cout<<c[id];


       
   }
    cout<<endl;

   }

    usleep(200);
    move_snake(snake_size, snake);
        for(int i =  snake_size-1; i>0; i--){
        snake[i].x=snake[i-1].x;
       snake[i].y=snake[i-1].y;
    }
    snake[0].x += ::move.x;
    snake[0].y += ::move.y;
    return render();
}
int main(){
    snake[0].x=20,snake[0].y=20;
     snake[1].x=21,snake[1].y=20;
      snake[2].x=22,snake[2].y=20;
            snake[3].x=23,snake[3].y=20;

    render();
    return 0;
}
