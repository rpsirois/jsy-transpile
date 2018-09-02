const { assert } = require('chai')
import { transpile_jsy } from 'jsy-transpile/esm/all'
import { scan_jsy_lines, test_ast_tokens_content, ast_tokens_content } from './_ast_test_utils'


describe @ 'JSY Scanner (template strings)', @=> ::
  it @ 'dedent multi-line strings', @=> ::
    const jsy_src = @[]
      'test @ `'
      '     Wouldn\'t it be nice to have your multi-line strings'
      '   auto-shifted based on their indent?'
      ''
      '   After all, if you need greater control, you\'ll likely'
      '     have to manually format the strings anyway… `'

    const js_src = transpile_jsy @ scan_jsy_lines(jsy_src)
    assert.deepEqual @ js_src.split('\n'), @[]
      'test(`'
      '  Wouldn\'t it be nice to have your multi-line strings'
      'auto-shifted based on their indent?'
      ''
      'After all, if you need greater control, you\'ll likely'
      '  have to manually format the strings anyway… `)'


  it @ 'single template strings', @=> ::
    const offside_ast = scan_jsy_lines @#
      'const classes = `header ${ inner() } extra`'

    test_ast_tokens_content @ offside_ast, @[]
      @[] @[] 'src', 'const classes = '
          @[] 'str_multi', '`header ${'
          @[] 'template_param', ''
          @[] 'src', ' inner() '
          @[] 'template_param_end', '}'
          @[] 'str_multi', ' extra`'
          @[] 'offside_dedent', undefined

  it @ 'single template strings with $ in string', @=> ::
    const offside_ast = scan_jsy_lines @# '`$${name}$`'
    test_ast_tokens_content @ offside_ast, @[]
      @[] @[] 'str_multi', '`$${'
          @[] 'template_param', ''
          @[] 'src', 'name'
          @[] 'template_param_end', '}'
          @[] 'str_multi', '$`'
          @[] 'offside_dedent', undefined

  it @ 'single template strings with jsy_ops', @=> ::
    const offside_ast = scan_jsy_lines @#
      'const classes = `header ${ first @ second @# third, 42 } extra`'

    test_ast_tokens_content @ offside_ast, @[]
      @[] @[] 'src', 'const classes = '
          @[] 'str_multi', '`header ${'
          @[] 'template_param', ''
          @[] 'src', ' first'
          @[] 'jsy_op', ' @'
          @[] 'src', ' second'
          @[] 'jsy_op', ' @#'
          @[] 'src', ' third, 42 '
          @[] 'template_param_end', '}'
          @[] 'str_multi', ' extra`'
          @[] 'offside_dedent', undefined


  it @ 'nested template strings', @=> ::
    const offside_ast = scan_jsy_lines @#
      "const classes = `header ${ isLargeScreen() ? '' :"
      "  `icon-${item.isCollapsed ? 'expander' : 'collapser'}` } extra`"

    test_ast_tokens_content @ offside_ast, @[]
      @[] @[] 'src', 'const classes = '
          @[] 'str_multi', '`header ${'
          @[] 'template_param', ''
          @[] 'src', ' isLargeScreen() ? '
          @[] 'str_single', "''"
          @[] 'src', ' :'
          @[] 'offside_dedent', undefined

      @[] @[] 'str_multi', '`icon-${'
          @[] 'template_param', ''
          @[] 'src', 'item.isCollapsed ? '
          @[] 'str_single', "'expander'"
          @[] 'src', ' : '
          @[] 'str_single', "'collapser'"
          @[] 'template_param_end', '}'
          @[] 'str_multi', '`'
          @[] 'src', ' '
          @[] 'template_param_end', '}'
          @[] 'str_multi', ' extra`'
          @[] 'offside_dedent', undefined
