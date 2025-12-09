import { useState } from "react";
import { Plus, Eye, Edit, Heart, AlertCircle } from "lucide-react";

function SeniorsListPage({ onViewProfile, userType = "caregiver" }) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedSenior, setSelectedSenior] = useState("");
  const seniors = [
    {
      id: 1,
      name: "Elder 1",
      age: 78,
      room: "204",
      status: "good",
      initials: "E1",
      lastUpdate: "10 mins ago",
      alerts: 0,
    },
    {
      id: 2,
      name: "Elder 2",
      age: 82,
      room: "301",
      status: "warning",
      initials: "E2",
      lastUpdate: "1 hour ago",
      alerts: 1,
    },
    {
      id: 3,
      name: "Elder 3",
      age: 75,
      room: "156",
      status: "good",
      initials: "E3",
      lastUpdate: "2 hours ago",
      alerts: 0,
    },
    {
      id: 4,
      name: "Elder 4",
      age: 80,
      room: "212",
      status: "urgent",
      initials: "E4",
      lastUpdate: "30 mins ago",
      alerts: 2,
    },
    {
      id: 5,
      name: "Elder 5",
      age: 77,
      room: "189",
      status: "good",
      initials: "E5",
      lastUpdate: "5 hours ago",
      alerts: 0,
    },
    {
      id: 6,
      name: "Elder 6",
      age: 81,
      room: "223",
      status: "good",
      initials: "E6",
      lastUpdate: "3 hours ago",
      alerts: 0,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "good":
        return "bg-[#52b788]";
      case "warning":
        return "bg-[#f0ad4e]";
      case "urgent":
        return "bg-[#e85d75]";
      default:
        return "bg-[#5f8074]";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "good":
        return "All Good";
      case "warning":
        return "Needs Attention";
      case "urgent":
        return "Urgent";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl text-[#1a3a2e]">Seniors Under Care</h2>
          <p className="text-[#5f8074]">Manage and monitor all seniors in your care</p>
        </div>
        {userType === "admin" && (
          <button 
            onClick={() => setShowAddDialog(true)}
            className="bg-[#2d9b6d] hover:bg-[#1f7a52] text-white rounded-xl h-12 px-6 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Senior
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-[#e6f7f0] rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#5f8074]">Total Seniors</p>
              <h3 className="text-3xl text-[#1a3a2e]">{seniors.length}</h3>
            </div>
            <div className="bg-gradient-to-br from-[#2d9b6d] to-[#4db88a] p-3 rounded-xl shadow-sm">
              <Heart className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white border border-[#e6f7f0] rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#5f8074]">All Good</p>
              <h3 className="text-3xl text-[#1a3a2e]">
                {seniors.filter((s) => s.status === "good").length}
              </h3>
            </div>
            <div className="bg-gradient-to-br from-[#52b788] to-[#6dd5a7] p-3 rounded-xl shadow-sm">
              <Heart className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white border border-[#e6f7f0] rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#5f8074]">Need Attention</p>
              <h3 className="text-3xl text-[#1a3a2e]">
                {seniors.filter((s) => s.status === "warning").length}
              </h3>
            </div>
            <div className="bg-gradient-to-br from-[#f0ad4e] to-[#f4be6e] p-3 rounded-xl shadow-sm">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white border border-[#e6f7f0] rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#5f8074]">Urgent</p>
              <h3 className="text-3xl text-[#1a3a2e]">
                {seniors.filter((s) => s.status === "urgent").length}
              </h3>
            </div>
            <div className="bg-gradient-to-br from-[#e85d75] to-[#f07089] p-3 rounded-xl shadow-sm">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Seniors List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {seniors.map((senior) => (
          <div
            key={senior.id}
            className="bg-white border border-[#e6f7f0] rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2d9b6d] to-[#4db88a] flex items-center justify-center text-white text-lg font-semibold">
                  {senior.initials}
                </div>
                <div>
                  <h4 className="text-lg text-[#1a3a2e]">{senior.name}</h4>
                  <p className="text-sm text-[#5f8074]">
                    Age: {senior.age} • Room {senior.room}
                  </p>
                </div>
              </div>
              {senior.alerts > 0 && (
                <span className="bg-[#e85d75] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {senior.alerts} Alert{senior.alerts > 1 ? "s" : ""}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(senior.status)}`} />
              <span className="text-sm text-[#5f8074]">{getStatusText(senior.status)}</span>
              <span className="text-sm text-[#5f8074] ml-auto">
                Updated {senior.lastUpdate}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={onViewProfile}
                className="flex-1 bg-[#2d9b6d] hover:bg-[#1f7a52] text-white rounded-xl py-2 px-4 flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Profile
              </button>
              {userType === "admin" && (
                <button
                  onClick={() => {
                    setSelectedSenior(senior.name);
                    setShowEditDialog(true);
                  }}
                  className="border border-[#2d9b6d] text-[#2d9b6d] hover:bg-[#f0f9f5] rounded-xl px-4 py-2"
                >
                  <Edit className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeniorsListPage;
