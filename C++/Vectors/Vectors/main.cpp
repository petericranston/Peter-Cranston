//
//  main.cpp
//  Vectors
//
//  Created by Peter Cranston on 20/07/2025.
//

#include <iostream>
#include <vector>

using namespace std;

int main() {
    
    vector<int> v1 = {1, 2, 3, 4};
    
    v1.insert(v1.begin(), 5);
    v1.erase(v1.begin());
    
    cout << v1[0] << endl;
    cout << v1.capacity() << endl;
    cout << v1.size() << endl;
    
    return 0;
}
