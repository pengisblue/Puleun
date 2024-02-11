import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";

export default function DeviceAddModal({ isOpen, closeModal }) {
  const [serialNum, setSerialNum] = useState(null);
  const handleSerialNum = (event) => {
    setSerialNum(event.target.value);
  };

  // 유효한 시리얼 넘버인지 확인
  const [isValidDevice, setIsValidDevice] = useState(null);
  const isValid = (serialNum) => {
    if (serialNum === "1234") {
      setIsValidDevice(true);
    } else {
      setIsValidDevice(false);
    }
  };

  const [deviceName, setDeviceName] = useState(null);
  const handleDeviceName = (event) => {
    setDeviceName(event.target.value);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-8 py-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="my-2 text-title leading-6 text-gray-900"
                >
                  화분 추가하기
                </Dialog.Title>
                <div className="mt-6 flex flex-col gap-4">
                  <div>
                    <label
                      htmlFor="serialNum"
                      className="text-lg font-semibold"
                    >
                      시리얼 번호
                    </label>
                    <div className="grid grid-cols-8 place-content-center gap-4">
                      <Input
                        id="serialNum"
                        type="text"
                        onChange={handleSerialNum}
                        className="col-span-6"
                      />
                      <Button
                        onClick={() => isValid(serialNum)}
                        className="col-span-2 mt-2 bg-gray-200 shadow-md hover:bg-gray-300"
                      >
                        조회
                      </Button>
                    </div>
                    {isValidDevice && (
                      <p className="mt-2 text-green-900">
                        유효한 시리얼 번호입니다!
                      </p>
                    )}
                    {isValidDevice === false && (
                      <p className="mt-2 text-red-900">
                        유효하지 않은 시리얼 번호입니다.
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="deviceName"
                      className="text-lg font-semibold"
                    >
                      기기 별명
                    </label>
                    <Input
                      id="deviceName"
                      type="text"
                      onChange={handleDeviceName}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="mt-6 flex">
                  <Button
                    onClick={closeModal}
                    className="ms-auto bg-amber-100 text-amber-800 shadow-md shadow-amber-100 
                    hover:bg-amber-300 hover:shadow-amber-400 disabled:shadow-none"
                    isDisabled={!isValidDevice || !deviceName}
                  >
                    등록하기
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
