# CuidaBemApp

**CuidaBem** é um MVP de um aplicativo de controle de remédios focado em simplicidade e funcionalidade. Desenvolvido com uma abordagem acessível, o app atende a diversos perfis de usuários, incluindo pessoas idosas, famílias, enfermeiros e até mesmo donos de pets que necessitam de um controle rigoroso de medicações.

O aplicativo também conta com funcionalidades avançadas, como visualização de farmácias próximas no mapa, e permite apenas administradores cadastrarem farmácias, garantindo um controle de qualidade. Essa funcionalidade abre espaço para parcerias futuras com farmácias, trazendo benefícios aos usuários.

---

## **Funcionalidades**
- **Controle de remédios**: Gerencie perfis internos (ex.: filhos, pacientes, pets).
- **Mapa de farmácias próximas**: Visualize farmácias por geolocalização.
- **Cadastro de farmácias**: Apenas administradores podem cadastrar farmácias.
- **Acessibilidade**: Interface intuitiva para idosos e usuários com baixa experiência tecnológica.

---

## **Arquitetura do Sistema**

O **CuidaBemApp** utiliza uma arquitetura baseada em componentes, promovendo reutilização e manutenção facilitada.

### **Telas**
- **SignUpScreen**: Tela de cadastro.
- **LoginScreen**: Tela de login.
- **HomeScreen**: Tela principal.

### **Componentes Reutilizáveis**
- **InputComponent**: Campos de entrada de texto.
- **FooterNavigation**: Barra de navegação.
- **Card**: Exibição de cards na tela Home e Perfil.
- **PrimaryButton**: Botão estilizado para ações principais.

---

## **Bibliotecas Utilizadas**
- **[react-native-maps](https://github.com/react-native-maps/react-native-maps)**: Exibição de mapas.
- **[expo-location](https://docs.expo.dev/versions/latest/sdk/location/)**: Obtenção da localização do dispositivo.
- **[@react-navigation/native](https://reactnavigation.org/)**: Navegação entre telas.
- **[expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)**: Seleção de imagens.
- **[@expo/vector-icons](https://docs.expo.dev/guides/icons/)**: Ícones personalizados.
- **[react-native-dropdown-picker](https://hossein-zare.github.io/react-native-dropdown-picker-website/)**: Menus suspensos.
- **[@react-native-community/datetimepicker](https://github.com/react-native-datetimepicker/datetimepicker)**: Seleção de data e hora.
- **[react-native-push-notification](https://github.com/zo0r/react-native-push-notification)**: Gerenciamento de notificações push.
- **[expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)**: Notificações no Expo.
- **[@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/)**: Persistência de dados.

---

## **Tecnologias, Ferramentas e Frameworks**
- **React Native**: Framework principal para o desenvolvimento mobile.
- **JavaScript**: Linguagem utilizada.
- **Node.js (v20.16.0)**: Ambiente de execução.
- **Git e GitHub**: Controle de versão.
- **Editor de Código**: Visual Studio Code.
- **Emulador**: Expo Go.

---

## **Integração com API**
### **Validação de Dados**
- Verificação de campos obrigatórios antes do envio.

### **Método de Comunicação**
- Requisições HTTP usando `fetch` com método `POST` e cabeçalhos configurados.

### **Persistência**
- Armazenamento de tokens e dados importantes utilizando `AsyncStorage`.

---

## **Instalação e Configuração**

### **Pré-requisitos**
- **Node.js** (v20.16.0) instalado.
- Gerenciador de pacotes: **npm** ou **yarn**.
- Emulador Android/iOS ou dispositivo físico.

### **Passos para Instalação**
1. Clone o repositório:
   ```bash
   git clone https://github.com/Maducdornelles/CuidaBem.git

2. Acesse a pasta do projeto
   ```bash
   cd CuidaBem


 3. Instale as dependências:
   ```bash
    npm install
