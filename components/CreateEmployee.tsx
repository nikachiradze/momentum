"use client";

import DataInput from "./DataInput";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";

type CreateEmployeeProps = {
  setIsPortalOpen: (isOpen: boolean) => void;
};

export default function CreateEmployee({
  setIsPortalOpen,
}: CreateEmployeeProps) {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isNameValid, setIsNameValid] = useState({
    min: false,
    max: false,
  });
  const [isLastNameValid, setIsLastNameValid] = useState({
    min: false,
    max: false,
  });
  const [credentials, setCredentials] = useState({
    name: "",
    surname: "",
    department_id: "",
  });
  const [departments, setDepartments] = useState([]);
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/png")) {
        setError("მხოლოდ PNG ფორმატი");
        return;
      }
      if (file.size > 600 * 1024) {
        setError("სურათი უნდა იყოს ნაკლები 600KB-ze");
        return;
      }
      setError("");
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    validate({ ...credentials, [name]: value }, "name");
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    validate({ ...credentials, [name]: value }, "surname");
  };

  const validate = (
    credentials: {
      name: string;
      surname: string;
      department_id: string;
    },
    field: string
  ) => {
    const currentNameValid = { ...isNameValid };
    if (field === "name") {
      if (credentials.name.length > 1) {
        currentNameValid.min = true;
      } else {
        currentNameValid.min = false;
      }
      if (credentials.name.length < 255 && credentials.name.length > 1) {
        currentNameValid.max = true;
      } else {
        currentNameValid.max = false;
      }
      setIsNameValid(currentNameValid);
    }
    const currentLastNameValid = { ...isLastNameValid };
    if (field === "surname") {
      if (credentials.surname.length > 1) {
        currentLastNameValid.min = true;
      } else {
        currentLastNameValid.min = false;
      }
      if (credentials.surname.length < 255 && credentials.surname.length > 1) {
        currentLastNameValid.max = true;
      } else {
        currentLastNameValid.max = false;
      }
      setIsLastNameValid(currentLastNameValid);
    }
  };

  async function fetchDepartments() {
    const response = await fetch(
      "https://momentum.redberryinternship.ge/api/departments"
    );
    const data = await response.json();
    setDepartments(data);
  }
  useEffect(() => {
    fetchDepartments();
  }, []);

  async function createEmployee() {
    if (!isFormValid) return;

    const formData = new FormData();
    formData.append("name", credentials.name);
    formData.append("surname", credentials.surname);
    formData.append("department_id", credentials.department_id);
    if (image) {
      formData.append("avatar", image);
    }

    const response = await fetch(
      "https://momentum.redberryinternship.ge/api/employees",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer 9e781fdb-1c24-4007-bda2-78411aa8bbc6",
        },
        body: formData,
      }
    );

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setIsPortalOpen(false);
    }
  }

  const isFormValid =
    isNameValid.min &&
    isNameValid.max &&
    isLastNameValid.min &&
    isLastNameValid.max &&
    credentials.department_id &&
    image;

  return (
    <div className="fixed inset-0 bg-black/50 ">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-12 rounded-lg w-[913px] h-[766px] flex flex-col gap-10">
        <div className="flex flex-row justify-end">
          <button
            className="bg-grey text-white font-bold h-[40px] w-[40px] rounded-full"
            onClick={() => setIsPortalOpen(false)}
          >
            X
          </button>
        </div>

        <div className="flex mt-7 flex-row justify-center">
          <h1 className="text-[32px] font-bold">თანამშრომლის დამატება</h1>
        </div>

        <div className="flex flex-row gap-10">
          <DataInput
            onChange={handleNameChange}
            value={credentials.name}
            name={"name"}
            label="სახელი*"
            isValid={isNameValid}
          />
          <DataInput
            onChange={handleLastNameChange}
            value={credentials.surname}
            name={"surname"}
            label="გვარი*"
            isValid={isLastNameValid}
          />
        </div>
        <div>
          <input
            onChange={handleImageUpload}
            className="bg-grey rounded-full hidden"
            type="file"
            accept="image/png"
            id="fileInput"
          />
          <span className=" text-sm text-black">ავატარი*</span>
          <div className="border border-dashed flex flex-row justify-center items-center py-2">
            {imagePreview ? (
              <div className="relative">
                <Image
                  src={imagePreview}
                  alt="avatar"
                  width={88}
                  height={88}
                  className="rounded-full object-cover"
                />
                <button
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                  }}
                  className="bg-grey rounded-full h-[20px] w-[20px] absolute top-0 right-0"
                >
                  X
                </button>
              </div>
            ) : (
              <label
                htmlFor="fileInput"
                className="cursor-pointer px-5 py-2 bg-grey w-[88px] h-[88px] text-black rounded-full hover:bg-blue-700 transition text-5xl flex justify-center items-center"
              >
                +
              </label>
            )}
          </div>
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
        <div className="w-1/2 flex flex-col">
          <label className="text-black text-[14px]">დეპარტამენტი*</label>
          <select
            onChange={(e) =>
              setCredentials({ ...credentials, department_id: e.target.value })
            }
            className="border border-grey rounded-md p-2"
          >
            <option value="">აირჩიე დეპარტამენტი</option>
            {departments.map((department: { id: number; name: string }) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-row gap-3 justify-end">
          <Button className="bg-white text-black border border-primary rounded-md">
            გაუქმება
          </Button>
          <Button
            onPress={createEmployee}
            className="bg-primary text-white  rounded-md px-3"
          >
            დაამატე თანამშრომელი
          </Button>
        </div>
      </div>
    </div>
  );
}
