
# Gerenciamento de Presenças

Este é um sistema de gerenciamento de presenças para professores em sala de aula. O sistema permite que os professores registrem presenças e faltas dos alunos, cadastrem turmas e alunos, e gerem relatórios de presença.

## Funcionalidades

- Sistema de login para professores.
- Cadastro de turmas e alunos.
- Registro de presenças e faltas diárias.
- Geração de relatórios de presença por aluno.
- Dashboard com gráfico de pizza mostrando o percentual de alunos presentes vs. faltosos.
- Filtro de alunos por turma.
- Edição do nome dos alunos.
- Notificações visuais para ações bem-sucedidas.

## Tecnologias Utilizadas

- HTML
- CSS (modularizado com variáveis e medidas relativas)
- JavaScript
- LocalStorage para armazenamento de dados
- Chart.js para gráficos

## Estrutura de Diretórios

```
/index.html
/css/
  /components/
    _variables.css
    _base.css
    _header.css
    _form.css
    _modal.css
    _notification.css
  styles.css
/js/app.js
/images/
```

## Como Usar

1. Clone o repositório para sua máquina local:
    ```sh
    git clone https://github.com/seu-usuario/gerenciamento-de-presencas.git
    ```

2. Navegue até o diretório do projeto:
    ```sh
    cd gerenciamento-de-presencas
    ```

3. Abra o arquivo `index.html` em seu navegador.

## Estrutura do Projeto

### index.html

O arquivo principal que contém a estrutura HTML da aplicação.

### CSS

O CSS está modularizado e dividido em vários arquivos dentro da pasta `/components`:

- `_variables.css`: Variáveis CSS para facilitar a manutenção e a personalização.
- `_base.css`: Estilos base para o corpo e elementos de texto.
- `_header.css`: Estilos para o cabeçalho da aplicação.
- `_form.css`: Estilos para os formulários.
- `_modal.css`: Estilos para o modal de edição.
- `_notification.css`: Estilos para as notificações visuais.
- `styles.css`: Arquivo principal que importa todos os arquivos de componentes.

### JavaScript

O arquivo `app.js` contém toda a lógica JavaScript da aplicação, incluindo a manipulação do DOM, registro de presenças e faltas, geração de relatórios e exibição de notificações.

## Funcionalidades Detalhadas

### Sistema de Login

- Os professores podem fazer login utilizando o nome de usuário e senha "professor" e "senha" respectivamente.
- O acesso ao dashboard é permitido apenas após a autenticação.

### Cadastro de Turmas e Alunos

- Os professores podem cadastrar novas turmas e alunos.
- Ao cadastrar um aluno, é necessário vinculá-lo a uma turma existente.

### Registro de Presenças e Faltas

- Os professores podem registrar a presença ou falta dos alunos diariamente.
- As presenças e faltas são armazenadas no LocalStorage com a data correspondente.

### Geração de Relatórios

- Os professores podem gerar relatórios de presença para cada aluno.
- O relatório exibe todas as datas de presença e falta do aluno selecionado.

### Dashboard

- O dashboard exibe um gráfico de pizza mostrando o percentual de alunos presentes vs. faltosos.
- É possível filtrar os alunos por turma para facilitar a visualização.

### Edição de Alunos

- Os professores podem editar o nome dos alunos através de um modal de edição.

### Notificações Visuais

- Notificações visuais são exibidas para confirmar ações bem-sucedidas, como login, cadastro de turmas e alunos, registro de presenças e faltas, e edição de nomes de alunos.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorias, correções de bugs ou novas funcionalidades.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
