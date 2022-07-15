#include <iostream>
#include <stdlib.h>
#include <unistd.h>
#include <time.h>
#include <algorithm>
#include <termios.h>

using namespace std;

char getch() {
        char buf = 0;
        struct termios old = {0};
        if (tcgetattr(0, &old) < 0)
                perror("tcsetattr()");
        old.c_lflag &= ~ICANON;
        old.c_lflag &= ~ECHO;
        old.c_cc[VMIN] = 1;
        old.c_cc[VTIME] = 0;
        if (tcsetattr(0, TCSANOW, &old) < 0)
                perror("tcsetattr ICANON");
        if (read(0, &buf, 1) < 0)
                perror ("read()");
        old.c_lflag |= ICANON;
        old.c_lflag |= ECHO;
        if (tcsetattr(0, TCSADRAIN, &old) < 0)
                perror ("tcsetattr ~ICANON");
        return (buf);
}
const int terminalX = 80;
const int terminalY = 23;
int snake_size = 1;
class Random
{
public:
    int x;
    int y;
};
Random snake[terminalY * terminalX];

Random RanPosition()
{

    Random position;
    srand(time(0));

    position.x = (rand() % (terminalX-2)) + 2;
    srand(time(0));

    position.y = (rand() %( terminalY-2)) + 2;
    return position;
}
Random food = RanPosition();
Random move = {0, 0};
void move_snake(int snake_size, Random snake[])
{
    char input;
    input = getch();

    if (input == 'w' && ::move.y == 0)
    {
        ::move.x = 0;
        ::move.y = -1;
    }
    else if (input == 'a' && ::move.x == 0)
    {
        ::move.y = 0;
        ::move.x = -1;
    }
    else if (input == 's' && ::move.y == 0)
    {
        ::move.x = 0;
        ::move.y = 1;
    }
    else if (input == 'd' && ::move.x == 0)
    {
        ::move.y = 0;

        ::move.x = 1;
    }
    else {
                ::move.y = 0;

        ::move.x = 0;
    }
}

// check for collision
bool collision(Random snake[])
{
    for (int i = 2; i < snake_size; i++)
    {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y)
        {
            
            return true;
        }
    }
    return false;
}
//check for collision to wall
bool collision_wall(Random snake[])
{
    if (snake[0].x == 1 || snake[0].x == terminalX|| snake[0].y == 1 || snake[0].y == terminalY )
    {
        return true;
    }
    return false;
}
// rickr
// check for food
bool Checkfood(Random snake[], int snake_size)
{
    return (snake[0].x == ::food.x && snake[0].y == ::food.y);
}
// check for win
bool search(Random snake[], Random value)
{
    for (int i = 0; i < snake_size; i++)
    {
        if (snake[i].x == value.x && snake[i].y == value.y)
        {
            return true;
        }
    }
    return 0;
}
int render()
{
    Random CurrentPosition;
// os independent code
#ifdef _WIN32
    system("cls");
#else
    system("clear");
#endif
    char c[5] = {'#', '@', 'o', ' ','O'};
    short id;
    for (int y = 1; y <= terminalY; y++)
    {
        CurrentPosition.y = y;
        for (int x = 1; x <= terminalX; x++)
        {
            CurrentPosition.x = x;

            if (x == 1 || x == terminalX || y == 1 || y == terminalY)
                id = 0;
            else if (x == food.x && y == food.y)
                id = 1;
            else if(CurrentPosition.x== snake[0].x&&CurrentPosition.y==snake[0].y)
                id = 4;
 
            else if (search(snake, CurrentPosition))
                id = 2;
            else
                id = 3;
            cout << c[id];
        }
        cout << endl;
    }

    usleep(200);
    move_snake(snake_size, snake);
    if (!(::move.x == 0 && ::move.y == 0))
{    for (int i = snake_size - 1; i > 0; i--)
    {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
    }}
    snake[0].x += ::move.x;
    snake[0].y += ::move.y;
    
    if (Checkfood(snake, snake_size))
    {
            food = RanPosition();
        snake_size++;

        snake[snake_size - 1].x = snake[snake_size - 2].x;
        snake[snake_size - 1].y = snake[snake_size - 2].y;
        snake_size++;

        snake[snake_size - 1].x = snake[snake_size - 2].x;
        snake[snake_size - 1].y = snake[snake_size - 2].y;
        snake_size++;

        snake[snake_size - 1].x = snake[snake_size - 2].x;
        snake[snake_size - 1].y = snake[snake_size - 2].y;
    }
    // rickroll the user when gameover
    if (collision_wall(snake)||(collision(snake)&& snake_size>4))

    {
        #ifdef _WIN32
                system("cls");
        #else
                system("clear");
        #endif
                cout << "Game Over" << endl;
               
        #ifdef _WIN32
                system("start https://www.youtube.com/watch?v=dQw4w9WgXcQ");
                
        #else
                system("open https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        #endif
        return 0;
    }
    return render();

}

//rickroll the user

int main()
{
    snake[0].x = 20, snake[0].y = 20;

    // check for game over & rickroll the user if gameover
    render();
    return 0;
}
