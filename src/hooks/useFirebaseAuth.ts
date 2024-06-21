import React from 'react';
import { ContextState, FirebaseAuthContext } from '../contexts/AuthContext';

function useFirebaseAuth(): ContextState {
    const context = React.useContext(FirebaseAuthContext);
    if (context === undefined) {
        throw new Error('useFirebaseAuth must be used within a FirebaseAuthProvider');
    }
    return context;
}

export { useFirebaseAuth }