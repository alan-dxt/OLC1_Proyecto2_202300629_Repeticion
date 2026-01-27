
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
// Comentarios
\/\/[^\n]*          {}
\/\*[^]*?\*\/       {}

"entero"            {return 'TK_entero'}
"decimal"           {return 'TK_decimal'}
"cadena"            {return 'TK_cadena'}
"caracter"          {return 'TK_caracter'}
"booleano"          {return 'TK_booleano'}
"Verdadero"         {return 'TK_verdadero'}
"Falso"             {return 'TK_falso'}

"con"               {return 'TK_con'}
"valor"             {return 'TK_valor'}
"imprimir"          {return 'TK_imprimir'}
"si"                {return 'TK_si'}
"o"                 {return 'TK_o'}
"de"                {return 'TK_de'}
"lo"                {return 'TK_lo'}
"contrario"         {return 'TK_contrario'}
"para"              {return 'TK_para'}
"mientras"          {return 'TK_mientras'}
"funcion"           {return 'TK_funcion'}
"procedimiento"     {return 'TK_procedimiento'}
"retornar"          {return 'TK_retornar'}
"ejecutar"          {return 'TK_ejecutar'}
"continuar"         {return 'TK_continuar'}
"tolower"           {return 'TK_toLower'}
"toupper"           {return 'TK_toUpper'}
"hacer"             {return 'TK_hacer'}
"hasta"             {return 'TK_hasta'}
"que"               {return 'TK_que'}
"detener"           {return 'TK_detener'}

{ID}                {return 'TK_id'}
{STRING}            {return 'TK_string'}
{CHAR}              {return 'TK_char'}
{DOUBLE}            {return 'TK_double'}
{INTEGER}           {return 'TK_int'}


'++'                {return 'TK_incremento'}
'+'                 {return 'TK_mas'}
'--'                {return 'TK_decremento'}
'-'                 {return 'TK_menos'}
'%'                 {return 'TK_modulo'}
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
':'                 {return 'TK_dosPuntos'}
','                 {return 'TK_coma'}
'?'                 {return 'TK_interrogacion'}

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
    const { AccesoID} = require('../Clases/Expresiones/AccesoID');
    const { Relacional } = require('../Clases/Expresiones/Relacional');
    const { Logico } = require('../Clases/Expresiones/Logico');
    const { Unario } = require('../Clases/Expresiones/Unario');
    const { OperadorTernario } = require('../Clases/Expresiones/OperadorTernario');
    const { Casteo } = require('../Clases/Expresiones/Casteo');
    const { ToLower } = require('../Clases/Expresiones/ToLower');
    const { ToUpper } = require('../Clases/Expresiones/ToUpper');

    //Instrucciones
    const { Imprimir } = require('../Clases/Instrucciones/Imprimir');
    const { DeclaracionID } = require('../Clases/Instrucciones/DeclaracionID');
    const { Reasignacion } = require('../Clases/Instrucciones/Reasignacion');
    const { IncDec } = require('../Clases/Instrucciones/IncDec');
    const { Si } = require('../Clases/Instrucciones/Si');
    const { Para } = require('../Clases/Instrucciones/Para');
    const { Mientras } = require('../Clases/Instrucciones/Mientras');
    const { Hacer } = require('../Clases/Instrucciones/Hacer');
    const { Continuar } = require('../Clases/Instrucciones/Continuar');
    const { Detener } = require('../Clases/Instrucciones/Detener');
%}

//Precedencia de operadores
%left 'TK_or'
%left 'TK_and'
%left 'TK_igualdad', 'TK_distinto'
%left 'TK_mayorIgual', 'TK_menorIgual', 'TK_menor', 'TK_mayor'
%left 'TK_mas', 'TK_menos'
%left 'TK_multiplicacion', 'TK_division', 'TK_modulo'
//%left 'TK_parAbre', 'TK_parCierra'

%right 'TK_not'
%right 'TK_potencia'


//Gramatica
%start INICIO

%%

INICIO
    : INSTRUCCIONES EOF
        {return $1;}
    | EOF
        {return [];}
    ;
    
INSTRUCCIONES
    : INSTRUCCIONES INSTRUCCION
        { $$.push($2); }
    | INSTRUCCION
        { $$ = [$1]; }
    ;

INSTRUCCION
    : IMPRIMIR
        { $$ = $1; }
    | DECLARACION_VARIABLE TK_puntoComa
        { $$ = $1; }
    | REASIGNACION TK_puntoComa
        { $$ = $1; }
    | SI
        { $$ = $1; }
    | PARA
        { $$ = $1; }
    | MIENTRAS
        { $$ = $1; }
    | HACER
        { $$ = $1; }
    | CONTINUAR
        { $$ = $1; }
    | DETENER
        { $$ = $1; }
    ;

IMPRIMIR
    : TK_imprimir EXPRESION TK_puntoComa
        { $$ = new Imprimir(@1.first_line, @1.first_column, $2); }
    ;

DECLARACION_VARIABLE
    :TIPO_DATO LISTA_IDS TK_asignacion LISTA_VALORES 
        { $$ = new DeclaracionID(@1.first_line, @1.first_column, $2, $1, $4); } 
    | TIPO_DATO LISTA_IDS TK_con TK_valor LISTA_VALORES 
        { $$ = new DeclaracionID(@1.first_line, @1.first_column, $2, $1, $5); }
    | TIPO_DATO LISTA_IDS
        { $$ = new DeclaracionID(@1.first_line, @1.first_column, $2, $1, null); }
    ;

LISTA_IDS
    : LISTA_IDS TK_coma TK_id
        { $$.push($3); }
    | TK_id
        { $$ = [$1]; }
    ;

LISTA_VALORES
    : LISTA_VALORES TK_coma EXPRESION
        { $$.push($3); }
    | EXPRESION
        { $$ = [$1]; }
    ;

REASIGNACION
    : TK_id TK_incremento
        { $$ = new IncDec(@1.first_line, @1.first_column, $1, $2); }
    | TK_id TK_decremento
        { $$ = new IncDec(@1.first_line, @1.first_column, $1, $2); }
    | TK_id TK_asignacion EXPRESION
        { $$ = new Reasignacion(@1.first_line, @1.first_column, $1, $3); }
    ;

SI
    : TK_si TK_parAbre EXPRESION TK_parCierra TK_llaveAbre INSTRUCCIONES TK_llaveCierra
        { $$ = new Si(@1.first_line, @1.first_column, $3, $6, null, null); }
    | TK_si TK_parAbre EXPRESION TK_parCierra TK_llaveAbre INSTRUCCIONES TK_llaveCierra DE_LO_CONTRARIO
        { $$ = new Si(@1.first_line, @1.first_column, $3, $6, null, $8); }
    | TK_si TK_parAbre EXPRESION TK_parCierra TK_llaveAbre INSTRUCCIONES TK_llaveCierra O_SI_LISTA
        { $$ = new Si(@1.first_line, @1.first_column, $3, $6, $8, null); }
    | TK_si TK_parAbre EXPRESION TK_parCierra TK_llaveAbre INSTRUCCIONES TK_llaveCierra O_SI_LISTA DE_LO_CONTRARIO
        { $$ = new Si(@1.first_line, @1.first_column, $3, $6, $8, $9); }
    ;

O_SI_LISTA
    : O_SI_LISTA O_SI
        { $$.push($2); }
    | O_SI
        { $$ = [$1]; }
    ;

O_SI
    : TK_o TK_si TK_parAbre EXPRESION TK_parCierra TK_llaveAbre INSTRUCCIONES TK_llaveCierra
        { $$ = {condicion: $4, instrucciones: $7}; }
    ;

DE_LO_CONTRARIO
    : TK_de TK_lo TK_contrario TK_llaveAbre INSTRUCCIONES TK_llaveCierra
        { $$ = $5}
    ;

PARA
    : TK_para TK_parAbre DECLARACION_PARA TK_puntoComa EXPRESION TK_puntoComa REASIGNACION TK_parCierra TK_llaveAbre INSTRUCCIONES TK_llaveCierra
        { $$ = new Para(@1.first_line, @1.first_column, $3, $5, $7, $10); }
    ;

DECLARACION_PARA
    : REASIGNACION
        { $$ = $1 }
    | DECLARACION_VARIABLE
        { $$ = $1 }
    ;

MIENTRAS
    : TK_mientras TK_parAbre EXPRESION TK_parCierra TK_llaveAbre INSTRUCCIONES TK_llaveCierra
        { $$ = new Mientras(@1.first_line, @1.first_column, $3, $6); }
    ;

HACER
    : TK_hacer TK_llaveAbre INSTRUCCIONES TK_llaveCierra TK_hasta TK_que TK_parAbre EXPRESION TK_parCierra
        { $$ = new Hacer(@1.first_line, @1.first_column, $3, $8); }
    ;

CONTINUAR
    : TK_continuar TK_puntoComa
        { $$ = new Continuar(@1.first_line, @1.first_column); }
    ;

DETENER
    : TK_detener TK_puntoComa
        { $$ = new Detener(@1.first_line, @1.first_column); }
    ;





EXPRESION
    : OPERADOR_TERNARIO
        { $$ = $1; }
    ;

OPERADOR_TERNARIO
    : LOGICO
        { $$ = $1; }
    | LOGICO TK_interrogacion EXPRESION TK_dosPuntos EXPRESION
        { $$ = new OperadorTernario(@1.first_line, @1.first_column, $1, $3, $5); }
    ;

LOGICO
    : RELACIONAL
        { $$ = $1; }
    | LOGICO TK_or RELACIONAL
        { $$ = new Logico(@1.first_line, @1.first_column, $1, $2, $3); }
    | LOGICO TK_and RELACIONAL
        { $$ = new Logico(@1.first_line, @1.first_column, $1, $2, $3); }
    ;

RELACIONAL
    : ARITMETICA
        { $$ = $1; }
    | RELACIONAL TK_igualdad ARITMETICA
        { $$ = new Relacional(@1.first_line, @1.first_column, $1, $2, $3); }
    | RELACIONAL TK_distinto ARITMETICA
        { $$ = new Relacional(@1.first_line, @1.first_column, $1, $2, $3); }
    | RELACIONAL TK_menor ARITMETICA
        { $$ = new Relacional(@1.first_line, @1.first_column, $1, $2, $3); }
    | RELACIONAL TK_menorIgual ARITMETICA
        { $$ = new Relacional(@1.first_line, @1.first_column, $1, $2, $3); }
    | RELACIONAL TK_mayor ARITMETICA
        { $$ = new Relacional(@1.first_line, @1.first_column, $1, $2, $3); }
    | RELACIONAL TK_mayorIgual ARITMETICA
        { $$ = new Relacional(@1.first_line, @1.first_column, $1, $2, $3); }
    ;

ARITMETICA
    : TERMINO
        { $$ = $1; }
    | ARITMETICA TK_mas TERMINO
        { $$ = new Aritmetico(@1.first_line, @1.first_column, $1, $2, $3); }
    | ARITMETICA TK_menos TERMINO
        { $$ = new Aritmetico(@1.first_line, @1.first_column, $1, $2, $3); }
    ;

TERMINO
    : POTENCIA
        { $$ = $1; }
    | TERMINO TK_multiplicacion POTENCIA
        { $$ = new Aritmetico(@1.first_line, @1.first_column, $1, $2, $3); }
    | TERMINO TK_division POTENCIA
        { $$ = new Aritmetico(@1.first_line, @1.first_column, $1, $2, $3); }
    | TERMINO TK_modulo POTENCIA
        { $$ = new Aritmetico(@1.first_line, @1.first_column, $1, $2, $3); }
    ;

POTENCIA
    : UNARIO
        { $$ = $1; }
    | UNARIO TK_potencia POTENCIA
        { $$ = new Aritmetico(@1.first_line, @1.first_column, $1, $2, $3); }
    ;

UNARIO
    : TK_not UNARIO
        { $$ = new Unario(@1.first_line, @1.first_column, $1, $2); }
    | TK_menos UNARIO
        { $$ = new Unario(@1.first_line, @1.first_column, $1, $2); }
    | TK_parAbre TIPO_DATO TK_parCierra UNARIO
        { $$ = new Casteo(@1.first_line, @1.first_column, $2, $4); }
    | FACTOR
        { $$ = $1; }
    ;

FACTOR
    : PRIMITIVO
        { $$ = $1; }
    | TK_id
        { $$ = new AccesoID(@1.first_line, @1.first_column, $1); }
    | TK_parAbre EXPRESION TK_parCierra
        { $$ = $2; }
    | TK_toLower TK_parAbre EXPRESION TK_parCierra
        { $$ = new ToLower(@1.first_line, @1.first_column, $3); }
    | TK_toUpper TK_parAbre EXPRESION TK_parCierra
        { $$ = new ToUpper(@1.first_line, @1.first_column, $3); }
    ;


PRIMITIVO
    : TK_int
        { $$ = new Primitivo(@1.first_line, @1.first_column, $1, Tipo.ENTERO); }
    | TK_double
        { $$ = new Primitivo(@1.first_line, @1.first_column, $1, Tipo.DECIMAL); }
    | TK_string
        { $$ = new Primitivo(@1.first_line, @1.first_column, $1, Tipo.CADENA); }
    | TK_char
        { $$ = new Primitivo(@1.first_line, @1.first_column, $1, Tipo.CARACTER); }
    | TK_verdadero
        { $$ = new Primitivo(@1.first_line, @1.first_column, true, Tipo.BOOLEANO); }
    | TK_falso
        { $$ = new Primitivo(@1.first_line, @1.first_column, false, Tipo.BOOLEANO); }
    ;


TIPO_DATO
    : TK_entero
        { $$ = Tipo.ENTERO; }
    | TK_decimal
        { $$ = Tipo.DECIMAL; }
    | TK_cadena
        { $$ = Tipo.CADENA; }
    | TK_caracter
        { $$ = Tipo.CARACTER; }
    | TK_booleano
        { $$ = Tipo.BOOLEANO; }
    ;    



