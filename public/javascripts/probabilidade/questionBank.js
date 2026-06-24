const fullQuestionBank = [
  {
    id: 'q1',
    pergunta: 'Qual a probabilidade de sair "cara" ao lançar uma moeda honesta?',
    opcoes: ['1/2', '1/3', '1/4', '1'],
    correta: 0,
    explicacao: 'Uma moeda honesta tem 2 resultados equiprováveis: cara e coroa. P(cara) = 1/2.'
  },
  {
    id: 'q2',
    pergunta: 'No lançamento de um dado convencional, qual a probabilidade de sair um número par?',
    opcoes: ['1/6', '1/3', '1/2', '2/3'],
    correta: 2,
    explicacao: 'Os pares são {2, 4, 6}, ou seja, 3 casos favoráveis em 6 possíveis: P = 3/6 = 1/2.'
  },
  {
    id: 'q3',
    pergunta: 'O espaço amostral do lançamento de duas moedas tem quantos elementos?',
    opcoes: ['2', '4', '6', '8'],
    correta: 1,
    explicacao: 'Cada moeda tem 2 resultados. Pelo princípio multiplicativo: 2 × 2 = 4 resultados.'
  },
  {
    id: 'q4',
    pergunta: 'Se a probabilidade de chover é 30%, qual a probabilidade de não chover?',
    opcoes: ['30%', '70%', '50%', '100%'],
    correta: 1,
    explicacao: 'P(não chover) = 1 − P(chover) = 1 − 0,30 = 0,70 = 70%.'
  },
  {
    id: 'q5',
    pergunta: 'Num baralho de 52 cartas, qual a probabilidade de tirar um Ás?',
    opcoes: ['1/52', '4/52', '1/13', 'b e c estão corretas'],
    correta: 3,
    explicacao: 'Há 4 ases em 52 cartas: 4/52 = 1/13. Ambas as formas estão corretas.'
  },
  {
    id: 'q6',
    pergunta: 'A soma das probabilidades de todos os eventos elementares de um espaço amostral é sempre:',
    opcoes: ['0', '0,5', '1', 'Depende do experimento'],
    correta: 2,
    explicacao: 'A soma das probabilidades de todos os resultados elementares de um experimento é sempre 1 (100%).'
  },
  {
    id: 'q7',
    pergunta: 'Um evento impossível tem probabilidade igual a:',
    opcoes: ['−1', '0', '0,5', '1'],
    correta: 1,
    explicacao: 'Evento impossível não possui casos favoráveis: P = 0/n(Ω) = 0.'
  },
  {
    id: 'q8',
    pergunta: 'Um evento certo tem probabilidade igual a:',
    opcoes: ['0', '0,5', '1', 'Depende do experimento'],
    correta: 2,
    explicacao: 'Evento certo coincide com todo o espaço amostral: P = n(Ω)/n(Ω) = 1.'
  },
  {
    id: 'q9',
    pergunta: 'Ao lançar dois dados, qual o número total de resultados possíveis?',
    opcoes: ['6', '12', '36', '64'],
    correta: 2,
    explicacao: 'Cada dado tem 6 faces: 6 × 6 = 36 pares ordenados possíveis.'
  },
  {
    id: 'q10',
    pergunta: 'Numa urna com 1 bola "1", 2 bolas "2", 3 bolas "3" e 4 bolas "4", qual P(tirar 3)?',
    opcoes: ['1/10', '3/10', '4/10', '6/10'],
    correta: 1,
    explicacao: 'n(Ω) = 10 e há 3 bolas com o número 3. P = 3/10.'
  },
  {
    id: 'q11',
    pergunta: 'Probabilidade é uma razão entre o número de casos favoráveis e o número de casos:',
    opcoes: ['impossíveis', 'prováveis', 'possíveis', 'certos'],
    correta: 2,
    explicacao: 'P(A) = casos favoráveis / casos possíveis, quando o espaço é finito e equiprovável.'
  },
  {
    id: 'q12',
    pergunta: 'Ao retirar uma carta de um baralho, qual a probabilidade de ser de copas?',
    opcoes: ['1/4', '1/13', '1/52', '1/2'],
    correta: 0,
    explicacao: 'Há 13 copas em 52 cartas: 13/52 = 1/4.'
  },
  {
    id: 'q13',
    pergunta: 'Ao lançar um dado, qual a probabilidade de sair um número maior que 4?',
    opcoes: ['1/6', '1/3', '1/2', '2/3'],
    correta: 1,
    explicacao: 'Maiores que 4: {5, 6}, ou seja, 2 casos em 6: P = 2/6 = 1/3.'
  },
  {
    id: 'q14',
    pergunta: 'Ao lançar um dado, qual a probabilidade de sair o número 7?',
    opcoes: ['1/6', '1/7', '0', '1'],
    correta: 2,
    explicacao: 'O número 7 não pertence ao espaço amostral {1,2,3,4,5,6}. É um evento impossível: P = 0.'
  },
  {
    id: 'q15',
    pergunta: 'Em uma urna com 5 bolas brancas e 5 pretas, a probabilidade de tirar uma bola branca é:',
    opcoes: ['25%', '50%', '75%', '100%'],
    correta: 1,
    explicacao: 'n(Ω) = 10 e n(branca) = 5. P = 5/10 = 1/2 = 50%.'
  },
  {
    id: 'q16',
    pergunta: 'Se P(A) = 0,2, então P(não A) é:',
    opcoes: ['0,2', '0,8', '1,2', '0'],
    correta: 1,
    explicacao: 'P(não A) = 1 − P(A) = 1 − 0,2 = 0,8.'
  },
  {
    id: 'q17',
    pergunta: 'Ao escolher um dia da semana ao acaso, qual a probabilidade de ser fim de semana?',
    opcoes: ['1/7', '2/7', '5/7', '1/2'],
    correta: 1,
    explicacao: 'Sábado e domingo são 2 dias em 7: P = 2/7.'
  },
  {
    id: 'q18',
    pergunta: 'O espaço amostral do sorteio dos algarismos de 0 a 9 tem quantos elementos?',
    opcoes: ['9', '10', '11', 'Infinitos'],
    correta: 1,
    explicacao: 'Ω = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}, portanto n(Ω) = 10 (espaço finito).'
  },
  {
    id: 'q19',
    pergunta: 'No sorteio de algarismos de 0 a 9, o evento A = "números pares" tem quantos elementos?',
    opcoes: ['4', '5', '6', '0'],
    correta: 1,
    explicacao: 'A = {0, 2, 4, 6, 8}, logo n(A) = 5.'
  },
  {
    id: 'q20',
    pergunta: 'No sorteio de algarismos de 0 a 9, o evento B = "números maiores que 9" tem quantos elementos?',
    opcoes: ['0', '1', '9', '10'],
    correta: 0,
    explicacao: 'Nenhum algarismo de 0 a 9 é maior que 9. B = ∅, logo n(B) = 0.'
  },
  {
    id: 'q21',
    pergunta: 'A probabilidade de um evento sempre está no intervalo:',
    opcoes: ['[−1, 1]', '[0, 1]', '[0, 100]', 'Depende'],
    correta: 1,
    explicacao: 'Por definição, 0 ≤ P(A) ≤ 1 para qualquer evento A.'
  },
  {
    id: 'q22',
    pergunta: 'Em um sorteio de 1 a 10, a probabilidade de sair um número primo (2, 3, 5, 7) é:',
    opcoes: ['20%', '30%', '40%', '50%'],
    correta: 2,
    explicacao: 'Há 4 primos em 10 números: P = 4/10 = 40%.'
  },
  {
    id: 'q23',
    pergunta: 'Em um sorteio de 1 a 10, a probabilidade de sair um múltiplo de 3 (3, 6, 9) é:',
    opcoes: ['10%', '20%', '30%', '40%'],
    correta: 2,
    explicacao: 'Há 3 múltiplos de 3 em 10 números: P = 3/10 = 30%.'
  },
  {
    id: 'q24',
    pergunta: 'O que é um evento?',
    opcoes: ['O experimento em si', 'O resultado de um cálculo', 'Qualquer subconjunto do espaço amostral', 'Uma probabilidade nula'],
    correta: 2,
    explicacao: 'Eventos (ou acontecimentos) são subconjuntos do espaço amostral, indicados por letras maiúsculas.'
  },
  {
    id: 'q25',
    pergunta: 'O espaço amostral é denotado frequentemente pela letra grega:',
    opcoes: ['Alfa', 'Beta', 'Gama', 'Ômega'],
    correta: 3,
    explicacao: 'O espaço amostral é indicado por Ω (ômega), o conjunto de todos os resultados possíveis.'
  },
  {
    id: 'q26',
    pergunta: 'Um espaço amostral com número fixo de elementos é chamado de:',
    opcoes: ['Infinito', 'Finito', 'Equiprovável', 'Composto'],
    correta: 1,
    explicacao: 'Espaços amostrais finitos possuem um número fixo de elementos, como o lançamento de um dado.'
  },
  {
    id: 'q27',
    pergunta: 'Qual a probabilidade de escolher uma vogal ao acaso da palavra PROBABILIDADE?',
    opcoes: ['6/13', '7/13', '5/13', '1/2'],
    correta: 0,
    explicacao: 'A palavra tem 13 letras e 6 vogais (O, O, A, I, I, A): P = 6/13.'
  },
  {
    id: 'q28',
    pergunta: 'Qual a probabilidade de tirar um número ímpar ao jogar um dado?',
    opcoes: ['1/6', '1/3', '1/2', '2/3'],
    correta: 2,
    explicacao: 'Ímpares: {1, 3, 5}, ou seja, 3 em 6: P = 3/6 = 1/2.'
  },
  {
    id: 'q29',
    pergunta: 'Numa classe de 20 meninos e 10 meninas, a probabilidade de sortear uma menina é:',
    opcoes: ['1/3', '1/2', '2/3', '1/10'],
    correta: 0,
    explicacao: 'n(Ω) = 30 e n(meninas) = 10: P = 10/30 = 1/3.'
  },
  {
    id: 'q30',
    pergunta: 'A fórmula P(A) = n(A)/n(Ω) é válida quando os resultados são:',
    opcoes: ['Certos', 'Impossíveis', 'Equiprováveis', 'Infinitos'],
    correta: 2,
    explicacao: 'A fórmula clássica exige espaço amostral finito e equiprovável.'
  },
  {
    id: 'q31',
    pergunta: 'Com os algarismos {6, 7, 8}, quantos números de 3 algarismos distintos podem ser formados?',
    opcoes: ['3', '6', '9', '27'],
    correta: 1,
    explicacao: 'São permutações de 3 elementos: P₃ = 3! = 6 números.'
  },
  {
    id: 'q32',
    pergunta: 'Se lançarmos 3 moedas, o espaço amostral tem quantos elementos?',
    opcoes: ['3', '6', '8', '9'],
    correta: 2,
    explicacao: 'Cada moeda tem 2 resultados: 2³ = 8 sequências possíveis.'
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fullQuestionBank };
}
