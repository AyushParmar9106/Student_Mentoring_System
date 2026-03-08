import toast from 'react-hot-toast';
import React from 'react';

type ToastType = 'success' | 'create' | 'update' | 'delete' | 'error';

export const triggerToast = (type: ToastType, message: string) => {
    switch (type) {
        case 'success':
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'toast-slide-in' : 'opacity-0'
                        } max-w-md w-full bg-body border-success border border-2 shadow-lg rounded-4 pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-3">
                        <div className="flex align-items-center">
                            <div className="flex-shrink-0 pt-0.5">
                                <i className="bi bi-check-circle-fill text-success fs-4"></i>
                            </div>
                            <div className="ms-3 flex-1">
                                <p className="text-sm font-medium text-body mb-0">
                                    {message}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ), { duration: 3000 });
            break;

        case 'create':
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'toast-scale-up' : 'opacity-0'
                        } max-w-md w-full bg-body border-primary border border-2 shadow-lg rounded-4 pointer-events-auto flex`}
                >
                    <div className="flex-1 w-0 p-3">
                        <div className="flex align-items-center">
                            <div className="flex-shrink-0 pt-0.5">
                                <i className="bi bi-stars text-primary fs-4"></i>
                            </div>
                            <div className="ms-3 flex-1">
                                <p className="text-sm font-medium text-body mb-0">
                                    {message}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ), { duration: 3500 });
            break;

        case 'update':
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'toast-pulse' : 'opacity-0'
                        } max-w-md w-full bg-body border-info border border-2 shadow-lg rounded-4 pointer-events-auto flex`}
                >
                    <div className="flex-1 w-0 p-3">
                        <div className="flex align-items-center">
                            <div className="flex-shrink-0 pt-0.5">
                                <i className="bi bi-arrow-repeat text-info fs-4"></i>
                            </div>
                            <div className="ms-3 flex-1">
                                <p className="text-sm font-medium text-body mb-0">
                                    {message}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ), { duration: 3000 });
            break;

        case 'delete':
            toast.custom((t) => (
                <div
                    className={`toast-shake-fade max-w-md w-full bg-danger text-white border-danger border border-2 shadow-lg rounded-4 pointer-events-auto flex`}
                >
                    <div className="flex-1 w-0 p-3">
                        <div className="flex align-items-center">
                            <div className="flex-shrink-0 pt-0.5">
                                <i className="bi bi-trash3-fill text-white fs-4"></i>
                            </div>
                            <div className="ms-3 flex-1">
                                <p className="text-sm font-medium text-white mb-0">
                                    {message}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ), { duration: 2000 });
            break;

        case 'error':
            toast.error(message, {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
            break;
    }
};
