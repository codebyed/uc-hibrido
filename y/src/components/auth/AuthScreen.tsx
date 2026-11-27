// React e os hooks para gerenciar estado da tela de autenticação
import React, { useState } from "react";

// Componentes nativos para construir o formulário
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";

// SafeAreaView para respeitar as áreas seguras do dispositivo
import { SafeAreaView } from "react-native-safe-area-context";

// Ícones para mostrar/ocultar senha e logo
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react-native";

// Botão reutilizável do projeto
import { Botao } from "../botao/botao";

// Cores e espaçamentos do tema global
import { theme } from "../../theme/theme";

// Tipos para o formulário
type AuthMode = "login" | "register";

interface FormData {
  nome?: string;
  email: string;
  senha: string;
  confirmarSenha?: string;
}

interface FormErrors {
  nome?: string;
  email?: string;
  senha?: string;
  confirmarSenha?: string;
}

// Componente principal da tela de autenticação
export default function AuthScreen({ onLoginSuccess }: { onLoginSuccess: (userName: string) => void }) {
  // Aqui eu controlo se está no modo login ou cadastro
  // useState<AuthMode> função que retorna um valor do tipo AuthMode e uma função para atualizá-lo
  // ("login") é o valor inicial do estado
  const [mode, setMode] = useState<AuthMode>("login");

  // Aqui eu guardo os dados do formulário
  // useState<FormData> função que retorna um objeto FormData e uma função para atualizá-lo
  // ({ nome: "", email: "", senha: "", confirmarSenha: "" }) é o valor inicial do estado
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  // Aqui eu guardo os erros de validação
  // useState<FormErrors> função que retorna um objeto FormErrors e uma função para atualizá-lo
  // ({}) é o valor inicial do estado (objeto vazio)
  const [errors, setErrors] = useState<FormErrors>({});

  // Aqui eu controlo a visibilidade da senha
  // useState<boolean> função que retorna um booleano e uma função para atualizá-lo
  // (false) é o valor inicial do estado
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  // Aqui eu controlo o estado de carregamento
  // useState<boolean> função que retorna um booleano e uma função para atualizá-lo
  // (false) é o valor inicial do estado
  const [loading, setLoading] = useState<boolean>(false);

  // Aqui eu valido o formulário antes de enviar
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
  // Se estiver no modo de cadastro, valida o nome
  // mode é o estado que controla se está no modo login ou cadastro
  // === "register" verifica se o modo é de cadastro
    if (mode === "register") {
      // Se o nome não estiver preenchido, mostra o erro
      // trim() remove espaços em branco do início e do fim
      // ? verifica se o valor existe antes de acessar a propriedade trim
      
      if (!formData.nome?.trim()) {
        newErrors.nome = "Nome é obrigatório";
      } else if (formData.nome.trim().length < 2) {
        newErrors.nome = "Nome deve ter pelo menos 2 caracteres";
      }
    }

    if (!formData.email?.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!formData.senha) {
      newErrors.senha = "Senha é obrigatória";
    } else if (formData.senha.length < 6) {
      newErrors.senha = "Senha deve ter pelo menos 6 caracteres";
    }

    if (mode === "register") {
      if (!formData.confirmarSenha) {
        newErrors.confirmarSenha = "Confirme sua senha";
      } else if (formData.senha !== formData.confirmarSenha) {
        newErrors.confirmarSenha = "As senhas não coincidem";
      }
    }

    setErrors(newErrors);
    // Object.keys(newErrors).length === 0 significa: zero erros = formulário válido
    return Object.keys(newErrors).length === 0;
  };

  // Trato o envio do formulário (login ou cadastro)
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    // Simulo uma chamada de API com delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);

    // Simulo o sucesso - em produção faria a chamada real para API
    // mode === "register" ? formData.nome?.trim() || "Usuário" : "Marina Costa"
    // Se for cadastro, pega o nome digitado; se for login, usa "Marina Costa"
    const userName = mode === "register" ? formData.nome?.trim() || "Usuário" : "Marina Costa";
    onLoginSuccess(userName);
  };

  // Alterno entre login e cadastro
  const toggleMode = () => {
    // prev === "login" ? "register" : "login"
    // Se anterior era login, vira register; senão vira login
    setMode((prev) => (prev === "login" ? "register" : "login"));
    setErrors({});
    setFormData({ nome: "", email: "", senha: "", confirmarSenha: "" });
  };

  // Atualizo um campo do formulário
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpo o erro quando o usuário começa a digitar
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    // Uso SafeAreaView para não ficar por baixo da barra de status
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Uso KeyboardAvoidingView para o teclado não cobrir os campos */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoiding}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo do app */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/images/icon.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Título e subtítulo */}
          <View style={styles.header}>
            {/* mode === "login" ? "Bem-vindo de volta" : "Crie sua conta" */}
            {/* Se mode for login, mostra "Bem-vindo de volta"; senão "Crie sua conta" */}
            <Text style={styles.title}>{mode === "login" ? "Bem-vindo de volta" : "Crie sua conta"}</Text>
            <Text style={styles.subtitle}>
              {mode === "login"
                ? "Entre no seu mural e continue de onde parou"
                : "Preencha seus dados para começar"}
            </Text>
          </View>

          {/* Formulário */}
          <View style={styles.form}>
            {/* Campo Nome (apenas no cadastro) */}
            {/* mode === "register" && (...) */}
            {/* Só renderiza este bloco se mode for "register" */}
            {mode === "register" && (
              <View style={styles.inputGroup}>
                <View style={styles.inputWrapper}>
                  <User size={20} color={theme.colors.inkFaint} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Nome completo"
                    value={formData.nome || ""}
                    onChangeText={(value) => handleChange("nome", value)}
                    autoCapitalize="words"
                    autoComplete="name"
                  />
                </View>
                {/* errors.nome && <Text>{errors.nome}</Text> */}
                {/* Só mostra o erro se errors.nome existir (truthy) */}
                {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}
              </View>
            )}

            {/* Campo E-mail */}
            <View style={styles.inputGroup}>
              <View style={styles.inputWrapper}>
                <Mail size={20} color={theme.colors.inkFaint} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="E-mail"
                  value={formData.email}
                  onChangeText={(value) => handleChange("email", value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  textContentType="emailAddress"
                />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            {/* Campo Senha */}
            <View style={styles.inputGroup}>
              <View style={styles.inputWrapper}>
                <Lock size={20} color={theme.colors.inkFaint} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
                  value={formData.senha}
                  onChangeText={(value) => handleChange("senha", value)}
                  secureTextEntry={!showPassword}
                  autoComplete="password"
                  // mode === "login" ? "password" : "newPassword"
                  // Se login, usa "password" para autofill; se cadastro, usa "newPassword"
                  textContentType={mode === "login" ? "password" : "newPassword"}
                />
                {/* Botão para mostrar/ocultar senha */}
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                  activeOpacity={0.7}
                >
                  {showPassword ? (
                    <EyeOff size={20} color={theme.colors.inkFaint} />
                  ) : (
                    <Eye size={20} color={theme.colors.inkFaint} />
                  )}
                </TouchableOpacity>
              </View>
              {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}
            </View>

            {/* Campo Confirmar Senha (apenas no cadastro) */}
            {mode === "register" && (
              <View style={styles.inputGroup}>
                <View style={styles.inputWrapper}>
                  <Lock size={20} color={theme.colors.inkFaint} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirmar senha"
                    value={formData.confirmarSenha || ""}
                    onChangeText={(value) => handleChange("confirmarSenha", value)}
                    secureTextEntry={!showConfirmPassword}
                    autoComplete="new-password"
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeButton}
                    activeOpacity={0.7}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} color={theme.colors.inkFaint} />
                    ) : (
                      <Eye size={20} color={theme.colors.inkFaint} />
                    )}
                  </TouchableOpacity>
                </View>
                {errors.confirmarSenha && <Text style={styles.errorText}>{errors.confirmarSenha}</Text>}
              </View>
            )}

            {/* Botão principal */}
            <Botao
              text={mode === "login" ? "Entrar" : "Criar conta"}
              variant="dark"
              onPress={handleSubmit}
              loading={loading}
              style={styles.submitButton}
            />

            {/* Texto para alternar entre login/cadastro */}
            <View style={styles.toggleContainer}>
              <Text style={styles.toggleText}>
                {/* mode === "login" ? "Não tem conta?" : "Já tem conta?" */}
                {mode === "login" ? "Não tem conta?" : "Já tem conta?"}{" "}
                <Text
                  style={styles.toggleLink}
                  onPress={toggleMode}
                >
                  {/* mode === "login" ? "Cadastre-se" : "Entre" */}
                  {mode === "login" ? "Cadastre-se" : "Entre"}
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Estilos da tela de autenticação
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  logo: {
    width: 88,
    height: 88,
    borderRadius: 22,
  },
  header: {
    alignItems: "center",
    marginBottom: 36,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.ink,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.inkSoft,
    textAlign: "center",
    lineHeight: 20,
  },
  form: {
    width: "100%",
    gap: 18,
  },
  inputGroup: {
    gap: 6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.line,
    borderRadius: theme.radius.md,
    paddingHorizontal: 14,
    height: 52,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: theme.colors.ink,
    paddingVertical: 0,
  },
  eyeButton: {
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    color: theme.colors.like,
    marginLeft: 2,
  },
  submitButton: {
    marginTop: 8,
  },
  toggleContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  toggleText: {
    fontSize: 13,
    color: theme.colors.inkSoft,
  },
  toggleLink: {
    color: theme.colors.accent,
    fontWeight: "600",
  },
});