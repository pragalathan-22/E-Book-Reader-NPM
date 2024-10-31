import { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';

const useNotificationPermission = () => {
    const [loading, setLoading] = useState(true);
    const [granted, setGranted] = useState(false);

    useEffect(() => {
        const requestUserPermission = async () => {
            try {
                const authStatus = await messaging().requestPermission();
                const enabled =
                    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

                setGranted(enabled);
                console.log('Authorization status:', authStatus);
            } catch (error) {
                console.error('Error requesting notification permission:', error);
            } finally {
                setLoading(false);
            }
        };

        requestUserPermission();
    }, []);

    return { loading, granted };
};

export default useNotificationPermission;
