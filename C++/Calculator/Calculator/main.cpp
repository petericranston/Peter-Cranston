//
//  main.cpp
//  Calculator
//
//  Created by Peter Cranston on 13/07/2025.

#include <iostream>

using namespace std;

void simple(int num1, int num2);
void medium(string input);

int main() {
    string cont = "yes";
    float num1;
    float num2;

    cout << "Welcome to the calculator!" << endl;
    
    while (cont == "yes" || cont == "Yes") {
        
        simple(num1, num2);
        cin.ignore();
        cout << "Would you like to go again? " << endl;
        cin >> cont;
    }
    return 0;
}

void simple (int num1, int num2) {
    int calc;
    
    cout << "What calculation would you like to make? \n 1. + \n 2. - \n 3. * \n 4. /" << endl;
    
    cin >> calc;
    cout << "First Number: ";
    cin >> num1;
    cout << "Second Numbeer: ";
    cin >> num2;

    switch (calc) {
        case 1:
            cout << num1 << " + " << num2 <<" = " << num1 + num2 << endl;
            break;
        case 2:
            cout << num1 << " - " << num2 <<" = " << num1 - num2 << endl;
            break;
        case 3:
            cout << num1 << " * " << num2 <<" = " << num1 * num2 << endl;
            break;
        case 4:
            cout << num1 << " / " << num2 <<" = " << num1 / num2 << endl;
            break;
        default:
            break;
    }
}

void medium(string input) {
    
}
