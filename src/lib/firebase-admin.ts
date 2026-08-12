// Firebase Admin SDK initialization (server-side only)
import { initializeApp, getApps, cert, getApp, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';

function getFirebaseAdmin(): App | null {
  if (getApps().length > 0) {
    return getApp();
  }

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');

  // Gracefully handle missing credentials (e.g., during build)
  if (!projectId || !clientEmail || !privateKey) {
    console.warn('Firebase Admin SDK credentials not found. API routes will not work until .env.local is configured.');
    return null;
  }

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

const adminApp = getFirebaseAdmin();

// Create proxy objects that throw helpful errors if Firebase is not configured
function createFirestoreProxy(): Firestore {
  if (!adminApp) {
    // Return a mock that throws on any method call
    return new Proxy({} as Firestore, {
      get(_, prop) {
        if (prop === 'collection') {
          return () => {
            throw new Error('Firebase Admin SDK not configured. Please set up your .env.local file.');
          };
        }
        return () => {
          throw new Error('Firebase Admin SDK not configured. Please set up your .env.local file.');
        };
      },
    });
  }
  return getFirestore(adminApp);
}

function createAuthProxy(): Auth {
  if (!adminApp) {
    return new Proxy({} as Auth, {
      get() {
        return () => {
          throw new Error('Firebase Admin SDK not configured. Please set up your .env.local file.');
        };
      },
    });
  }
  return getAuth(adminApp);
}

export const adminDb = createFirestoreProxy();
export const adminAuth = createAuthProxy();

export default adminApp;
