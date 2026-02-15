"use client";

import DaumPostcode from 'react-daum-postcode';
import { X } from 'lucide-react';

interface AddressSearchModalProps {
  onComplete: (data: any) => void;
  onClose: () => void;
}

export default function AddressSearchModal({ onComplete, onClose }: AddressSearchModalProps) {
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    onComplete({
      zonecode: data.zonecode,
      address: fullAddress,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden relative">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="font-bold text-lg">주소 검색</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 h-[500px]">
          <DaumPostcode 
            onComplete={handleComplete} 
            style={{ height: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}
