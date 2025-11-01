// `client/src/pages/DindingCerita.jsx`
import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { MessageCircle } from 'lucide-react';

export default function DindingCerita() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-6">
            <Card className="text-center rounded-2xl p-8">
                <MessageCircle size={100} className="text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Dinding Cerita</h2>
                <p className="text-gray-600 mb-4">Fitur ini sedang dalam pengembangan dan akan segera hadir!</p>
                <Button label="Kembali ke Dashboard" icon="pi pi-arrow-left" onClick={() => window.history.back()} />
            </Card>
        </div>
    );
}
