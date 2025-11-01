import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Brain } from 'lucide-react';

export default function JelajahDiri() {
    return (
        <div className="container-custom py-6 fade-in">
            <Card className="text-center border-round-2xl">
                <Brain size={100} className="text-primary-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Jelajah Diri</h2>
                <p className="text-gray-600 mb-4">
                    Fitur ini sedang dalam pengembangan dan akan segera hadir!
                </p>
                <Button label="Kembali ke Dashboard" icon="pi pi-arrow-left" onClick={() => window.history.back()} />
            </Card>
        </div>
    );
}