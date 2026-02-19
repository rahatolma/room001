"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/Button';
import styles from './page.module.css';

export default function LoginPage() {
    // Redirect to home with login query param to open the modal
    if (typeof window !== 'undefined') {
        window.location.href = '/?login=true';
    }
    return null;
}
