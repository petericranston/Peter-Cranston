//
//  main.cpp
//  Pointers
//
//  Created by Peter Cranston on 20/07/2025.
//

#include <iostream>
#include <memory>
#include <string>

using namespace std;

void pointers();
void smartPointers();

class Player {
    
public:
    Player(){
        cout << "Player created" << endl;
    }
    ~Player(){
        cout << "Player Destroyed" << endl;
    }
    
    void run(){
        cout << "Player is running" << endl;
    }
};


int main() {
    smartPointers();
    return 0;
}


void pointers() {
    //    int x = 2;
    //
    //    int *y = &x;
    //
    //    cout << y << endl;
    //    cout << &x << endl;
    //    cout << &y << endl;
    //    cout << *y << endl;
    //
        
        int x[] = {1, 2 ,3};
        int *head = x;
        
        for (int i = 0; i < 3; i++) {
            head = x+i;
            cout << *head << endl;
        }
        
        cout << *head << endl;
}

void smartPointers(){
    {
        unique_ptr<Player>entity = make_unique<Player>(new Player);
        
        entity->run();
    }
}
