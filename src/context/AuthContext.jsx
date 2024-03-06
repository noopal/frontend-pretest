import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const csrf = () => {
    axios.get("http://localhost:8000/sanctum/csrf-cookie");
  };

  const getUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/user");
      setUser(data);
    } catch (error) {
      setErrorMessage("Gagal mengambil data pengguna. Silakan coba lagi.");
    }
  };

  const login = async (data) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:8000/api/login", data);
      getUser();
      setLoading(false);
      setErrorMessage("Login berhasil!");
      navigate("/pretest-1");
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Login gagal. Silakan coba lagi.");
      }
    }
  };

  const register = async (data) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:8000/api/register", data);
      getUser();
      setLoading(false);
      setErrorMessage("Mendaftar berhasil!");
      navigate("/pretest-1");
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Registrasi gagal. Silakan coba lagi.");
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, errorMessage, getUser, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
