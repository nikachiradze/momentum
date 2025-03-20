"use client";
import OptionSelector from "@/components/OptionSelector";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
import Select from "react-select";
import TaskCard from "./TaskCard";
import { Task } from "../types";
import SingleOptionSelector from "@/components/SingleOptionSelector";

const options = [
  { value: "marketing", label: "მარკეტინგის დეპარტმენტი" },
  { value: "design", label: "დიზაინის დეპარტმენტი" },
  { value: "development", label: "IT დეპარტმენტი" },
  { value: "logistics", label: "ლოგისტიკის დეპარტმენტი" },
];

export type Employee = {
  id: number;
  name: string;
  surname: string;
  avatar: string;
};

export default function Tasks() {
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<number[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<number>(0);
  const [employees, setEmplyees] = useState<Employee[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [departments, setDepartments] = useState<
    { id: number; name: string }[]
  >([]);
  const [priorities, setPriorities] = useState<{ id: number; name: string }[]>(
    []
  );

  const toggleDepartment = (id: number) => {
    const isSelected = selectedDepartments.includes(id);
    if (isSelected) {
      setSelectedDepartments(selectedDepartments.filter((n) => n !== id));
    } else {
      setSelectedDepartments([...selectedDepartments, id]);
    }
  };

  const togglePriority = (id: number) => {
    const isSelected = selectedPriorities.includes(id);
    if (isSelected) {
      setSelectedPriorities(selectedPriorities.filter((n) => n !== id));
    } else {
      setSelectedPriorities([...selectedPriorities, id]);
    }
  };

  const toggleEmployee = (id: number) => {
    if (id === selectedEmployee) {
      setSelectedEmployee(0);
    } else {
      setSelectedEmployee(id);
    }
  };

  async function fetchDepartments() {
    const response = await fetch(
      "https://momentum.redberryinternship.ge/api/departments"
    );
    const data = await response.json();
    setDepartments(data);
  }

  async function fetchPriorities() {
    const response = await fetch(
      "https://momentum.redberryinternship.ge/api/priorities"
    );
    const data = await response.json();
    setPriorities(data);
  }

  async function fetchEmployees() {
    const response = await fetch(
      "https://momentum.redberryinternship.ge/api/employees",
      {
        headers: {
          Authorization: "Bearer 9e781fdb-1c24-4007-bda2-78411aa8bbc6",
        },
      }
    );

    const data = await response.json();
    setEmplyees(data);
  }

  async function fetchTasks() {
    const response = await fetch(
      "https://momentum.redberryinternship.ge/api/tasks",
      {
        headers: {
          Authorization: "Bearer 9e781fdb-1c24-4007-bda2-78411aa8bbc6",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setTasks(data);
  }
  useEffect(() => {
    fetchEmployees();
    fetchTasks();
  }, []);

  return (
    <div className="mt-16">
      <h1 className="text-4xl font-bold">დავალებების გვერდი</h1>
      <div className="flex gap-4 text-black text-[16px] mt-10">
        <OptionSelector
          name={"დეპარტამენტი"}
          isOpen={isDepartmentOpen}
          setIsOpen={setIsDepartmentOpen}
          options={departments}
          selected={selectedDepartments}
          toggleOption={toggleDepartment}
          fetchData={fetchDepartments}
        />
        <OptionSelector
          name={"პრიორიტეტი"}
          isOpen={isPriorityOpen}
          setIsOpen={setIsPriorityOpen}
          options={priorities}
          selected={selectedPriorities}
          toggleOption={togglePriority}
          fetchData={fetchPriorities}
        />
        <SingleOptionSelector
          name={"თანამშრომელი"}
          isOpen={isEmployeeOpen}
          setIsOpen={setIsEmployeeOpen}
          options={employees}
          selected={selectedEmployee}
          toggleOption={toggleEmployee}
          fetchData={fetchEmployees}
        />
      </div>

      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-4">
          <div className="bg-toStart w-[381px]  flex flex-row justify-center items-center text-white p-4 rounded-lg">
            დასაწყები
          </div>
          {tasks
            .filter((task) => task.status.id == 1)
            .map((task) => (
              <TaskCard key={task.id} />
            ))}
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-inProgress w-[381px] flex flex-row justify-center items-center text-white p-4 rounded-lg">
            პროგრესში
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-readyForTesting w-[381px] flex flex-row justify-center items-center text-white p-4 rounded-lg">
            მზად ტესტირებისთვის
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-ended w-[381px] flex flex-row justify-center items-center text-white p-4 rounded-lg">
            დასრულებული
          </div>
        </div>
      </div>
    </div>
  );
}
