"use client";

import React, { useEffect, Suspense } from 'react';

function SignupLogic() {
    useEffect(() => {
        window.location.href = '/?signup=true';
    }, []);
    return null;
}

export default function SignupPage() {
    return (
        <Suspense fallback={null}>
            <SignupLogic />
        </Suspense>
    );
}
