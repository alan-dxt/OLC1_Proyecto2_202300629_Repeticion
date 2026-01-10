
//------------------------------------------------------ANALIZADOR LEXICO------------------------------------------------------

%{
    //JAVASCRIPT
    


%}

%lex

UNUSED      [\s\r\t]+
INTEGER     [0-9]+\b
DOUBLE      [0-9]+\.[0-9]+\b
ID          [a-zA-Z_][a-zA-Z0-9_]*
STRING      \"([^\"\\]|\\.)*\"
CHAR        \'([^\\']|\\.)\'

%%

\n                  {}
{UNUSED}            {}

"entero"            {return 'TK_entero'}
"decimal"           {return 'TK_decimal'}
"cadena"            {return 'TK_cadena'}
"caracter"          {return 'TK_caracter'}
"booleano"          {return 'TK_booleano'}
"Verdadero"         {return 'TK_verdadero'}
"False"             {return 'TK_falso'}

"con"               {return 'TK_con'}
"valor"             {return 'TK_valor'}
"imprimir"          {return 'TK_imprimir'}
"si"                {return 'TK_if'}
"o"                 {return 'TK_else'}
"para"              {return 'TK_para'}
"funcion"           {return 'TK_funcion'}
"procedimiento"     {return 'TK_procedimiento'}
"retornar"          {return 'TK_retornar'}
"ejecutar"          {return 'TK_ejecutar'}

{ID}                {return 'TK_id'}
{STRING}            {return 'TK_string'}
{CHAR}              {return 'TK_char'}
{DOUBLE}            {return 'TK_double'}
{INTEGER}           {return 'TK_int'}

'+'                 {return 'TK_mas'}
'%'                 {return 'TK_modulo'}
'-'                 {return 'TK_menos'}
'*'                 {return 'TK_multiplicacion'}
'/'                 {return 'TK_division'}
'^'                 {return 'TK_potencia'}
'=='                {return 'TK_igualdad'}
'!='                {return 'TK_distinto'}
'='                 {return 'TK_asignacion'}
'>='                {return 'TK_mayorIgual'}
'<='                {return 'TK_menorIgual'}
'>'                 {return 'TK_mayor'}
'<'                 {return 'TK_menor'}
'&&'                {return 'TK_and'}
'||'                {return 'TK_or'}
'!'                 {return 'TK_not'}
'('                 {return 'TK_parAbre'}
')'                 {return 'TK_parCierra'}
'{'                 {return 'TK_llaveAbre'}
'}'                 {return 'TK_llaveCierra'}
';'                 {return 'TK_puntoComa'}
','                 {return 'TK_coma'}

.                   {}
<<EOF>>             {return 'EOF'}



/lex

//------------------------------------------------------ANALIZADOR SINTACTICO------------------------------------------------------
%{
    //Javascript

    //Tipos
    const { Tipo } = require('../Clases/Utilidades/Tipo')

    //Expresiones
    const { Primitivo } = require('../Clases/Expresiones/Primitivo');
    const { Aritmetico } = require('../Clases/Expresiones/Aritmetico');
    const { AccesoId} = require('../Clases/Expresiones/AccesoID');

    //Instrucciones
    const { Imprimir } = require('../Clases/Instrucciones/Imprimir');
    const { DeclaracionID } = require('../Clases/Instrucciones/DeclaracionID')
%}

//Precedencia de operadores
%left 'TK_or'
%left 'TK_and'
%left 'TK_igualdad', 'TK_distinto'
%left 'TK_mayorIgual', 'TK_menorIgual', 'TK_menor', 'TK_mayor'
%left 'TK_mas', 'TK_potencia'
%left 'TK_mas', 'TK_menos'
%left 'TK_multiplicacion', 'TK_division', 'TK_modulo'
%left 'TK_parAbre', 'TK_parCierra'

%right 'TK_not'
%right 'TK_potencia'


//Gramatica
%start INICIO

%%

INICIO:
    INSTRUCCIONES EOF       {return $1} |
    EOF                         {return []};
    
INSTRUCCIONES:
    INSTRUCCIONES INSTRUCCION   {$$.push($2)}   |
    INSTRUCCION                 {$$ = [$1]}     ;

INSTRUCCION:
    IMPRIMIR                {$$ = $1}   |
    DECLARACION_VARIABLE    {$$ = $1}   |
    REASIGNACION            {$$ = $1};

    IMPRIMIR:
        TK_imprimir EXPRESION TK_puntoComa {$$ = new Imprimir(@1.first_line, @1.first_column, $2)};

    DECLARACION_VARIABLE:
        TIPO_DATO LISTA_IDS TK_con TK_valor LISTA_VALORES TK_puntoComa      {$$ = new DeclaracionID(@1.first_line, @1.first_column, $2, $1, $5)}    |
        TIPO_DATO LISTA_IDS TK_puntoComa                                    {$$ = new DeclaracionID(@1.first_line, @1.first_column, $2, $1, null)};

        LISTA_IDS:
            LISTA_IDS TK_coma TK_id     {$$.push($3)}   |
            TK_id               {$$ = [$1]};

        LISTA_VALORES:
            LISTA_VALORES TK_coma EXPRESION   {$$.push($3)}   |
            EXPRESION           {$$ = [$1]};

    REASIGNACION:
        TK_id TK_asignacion EXPRESION TK_puntoComa;
    
    EXPRESION:
        ARITMETICA      {$$ = $1}   |
        PRIMITIVO       {$$ = $1}   |
        TK_id           {$$ = new AccesoID(@1.first_line, @1.first_column, $1)};


    


    ARITMETICA:
        PRIMITIVO SIMBOLO_BASICO PRIMITIVO    {$$ = new Aritmetico(@1.first_line, @1.first_column, $1, $2, $3)};

    PRIMITIVO:
        TK_int          {$$ = new Primitivo(@1.first_line, @1.first_column, $1, Tipo.ENTERO)}       |
        TK_double       {$$ = new Primitivo(@1.first_line, @1.first_column, $1, Tipo.DECIMAL)}      |
        TK_string       {$$ = new Primitivo(@1.first_line, @1.first_column, $1, Tipo.CADENA)}       |
        TK_char         {$$ = new Primitivo(@1.first_line, @1.first_column, $1, Tipo.CARACTER)};

    SIMBOLO_BASICO:
        TK_mas              {$$ = $1}   |
        TK_menos            {$$ = $1}   |
        TK_division         {$$ = $1}   |
        TK_multiplicacion   {$$ = $1}   |
        TK_modulo           {$$ = $1}   |
        TK_potencia         {$$ = $1};

    TIPO_DATO:
        TK_entero       {$$ = Tipo.ENTERO}      |
        TK_decimal      {$$ = Tipo.DECIMAL}     |
        TK_cadena       {$$ = Tipo.CADENA}      |
        TK_caracter     {$$ = Tipo.CARACTER}    |
        TK_booleano     {$$ = Tipo.BOOLEANO};    



